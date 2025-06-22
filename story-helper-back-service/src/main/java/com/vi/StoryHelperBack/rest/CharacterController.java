package com.vi.StoryHelperBack.rest;

import com.datastax.oss.driver.shaded.guava.common.collect.Lists;
import com.vi.StoryHelperBack.domain.Action;
import com.vi.StoryHelperBack.domain.Character;
import com.vi.StoryHelperBack.domain.Log;
import com.vi.StoryHelperBack.domain.Story;
import com.vi.StoryHelperBack.repository.CharacterRepository;
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
@RequestMapping("/api/v1/character")
@Slf4j
@RequiredArgsConstructor
public class CharacterController {
    private final CharacterRepository characterRepository;
    private final StoryRepository storyRepository;
    private final TokenCheckerService tokenCheckerService;
    private KafkaTemplate<String, Log> kafkaTemplate;

    @Value("${spring.topics.logs-topic}")
    private String kafkaTopicName;

    //create or update
    @PutMapping
    public ResponseEntity<Character> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("storyId") UUID storyId, @RequestBody Character entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        boolean exists = characterRepository.findById(entity.getId()).isPresent();
        Character result = characterRepository.save(entity);

        if (!exists) {
            Story story = storyRepository.findById(storyId)
                    .orElseThrow(() -> new RuntimeException("Story not found with id : " + storyId));
            story.addCharacter(result.getId());
            storyRepository.save(story);
        }

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), exists ? Action.CREATE_CHARACTER : Action.EDIT_CHARACTER, username, LocalDateTime.now(), "character", result.getId()));

        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Character character = characterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Character not found with id : " + id));
        character.setDeleted(true);
        characterRepository.save(character);

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), Action.DELETE_CHARACTER, username, LocalDateTime.now(), "character", id));

        return ResponseEntity.ok("Character was deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Character>> findByIds(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("ids") List<UUID> ids) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Character> characters = Lists.newArrayList();
        for(UUID id : ids) {
            characters.add(characterRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new RuntimeException("Character not found with id : " + id)));
        }

        return ResponseEntity.ok(characters);
    }
}
