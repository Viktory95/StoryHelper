package com.vi.StoryHelperBack.rest;

import com.datastax.oss.driver.shaded.guava.common.collect.Lists;
import com.vi.StoryHelperBack.domain.Action;
import com.vi.StoryHelperBack.domain.Character;
import com.vi.StoryHelperBack.domain.Log;
import com.vi.StoryHelperBack.domain.Node;
import com.vi.StoryHelperBack.domain.Story;
import com.vi.StoryHelperBack.repository.NodeRepository;
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
@RequestMapping("/api/v1/node")
@Slf4j
@RequiredArgsConstructor
public class NodeController {
    private final NodeRepository nodeRepository;
    private final StoryRepository storyRepository;
    private final TokenCheckerService tokenCheckerService;
    private KafkaTemplate<String, Log> kafkaTemplate;

    @Value("${spring.topics.logs-topic}")
    private String kafkaTopicName;

    //create or update
    @PutMapping
    public ResponseEntity<Node> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("storyId") UUID storyId, @RequestBody Node entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        boolean exists = nodeRepository.findById(entity.getId()).isPresent();
        Node result = nodeRepository.save(entity);

        if (!exists) {
            Story story = storyRepository.findById(storyId)
                    .orElseThrow(() -> new RuntimeException("Story not found with id : " + storyId));
            story.addCharacter(result.getId());
            storyRepository.save(story);
        }

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), exists ? Action.CREATE_NODE : Action.EDIT_NODE, username, LocalDateTime.now(), "node", result.getId()));

        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Node node = nodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Node not found with id : " + id));
        node.setDeleted(true);
        nodeRepository.save(node);

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), Action.DELETE_NODE, username, LocalDateTime.now(), "node", id));

        return ResponseEntity.ok("Node was deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Node>> findByIds(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("ids") List<UUID> ids) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Node> nodes = Lists.newArrayList();
        for(UUID id : ids) {
            nodes.add(nodeRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new RuntimeException("Node not found with id : " + id)));
        }

        return ResponseEntity.ok(nodes);
    }
}
