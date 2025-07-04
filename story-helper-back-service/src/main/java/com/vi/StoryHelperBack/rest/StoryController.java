package com.vi.StoryHelperBack.rest;

import com.vi.StoryHelperBack.domain.Action;
import com.vi.StoryHelperBack.domain.Log;
import com.vi.StoryHelperBack.domain.Story;
import com.vi.StoryHelperBack.repository.StoryRepository;
import com.vi.StoryHelperBack.service.TokenCheckerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/story")
@Slf4j
@RequiredArgsConstructor
public class StoryController {
    private final StoryRepository storyRepository;
    private KafkaTemplate<String, Log> kafkaTemplate;
    private final TokenCheckerService tokenCheckerService;

    @Value("${spring.topics.logs-topic}")
    private String kafkaTopicName;

    //create or update
    @PutMapping
    public ResponseEntity<Story> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestBody Story entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        boolean exists = storyRepository.findById(entity.getId()).isPresent();
        Story result = storyRepository.save(entity);

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), exists ? Action.CREATE_STORY : Action.EDIT_STORY, username, LocalDateTime.now(), "story", result.getId()));

        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            throw new RuntimeException("Token is not valid.");

        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with id : " + id));
        story.setDeleted(true);
        storyRepository.save(story);

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), Action.DELETE_STORY, username, LocalDateTime.now(), "story", id));

        return ResponseEntity.ok("Story was deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Story>> findAll(@RequestParam("token") String token, @RequestParam("username") String username) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            throw new RuntimeException("Token is not valid.");

        return ResponseEntity.ok(storyRepository.findAllByStUserAndIsDeleted(username, false));
    }
}
