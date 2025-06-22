package com.vi.StoryHelperBack.rest;

import com.datastax.oss.driver.shaded.guava.common.collect.Lists;
import com.vi.StoryHelperBack.domain.Action;
import com.vi.StoryHelperBack.domain.Flag;
import com.vi.StoryHelperBack.domain.Log;
import com.vi.StoryHelperBack.domain.Node;
import com.vi.StoryHelperBack.repository.FlagRepository;
import com.vi.StoryHelperBack.repository.NodeRepository;
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
@RequestMapping("/api/v1/flag")
@Slf4j
@RequiredArgsConstructor
public class FlagController {
    private final FlagRepository flagRepository;
    private final NodeRepository nodeRepository;
    private final TokenCheckerService tokenCheckerService;
    private KafkaTemplate<String, Log> kafkaTemplate;

    @Value("${spring.topics.logs-topic}")
    private String kafkaTopicName;

    //create or update
    @PutMapping
    public ResponseEntity<Flag> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("nodeId") UUID nodeId, @RequestBody Flag entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        boolean exists = flagRepository.findById(entity.getId()).isPresent();
        Flag result = flagRepository.save(entity);

        if(!exists) {
            Node node = nodeRepository.findById(nodeId).orElseThrow(() -> new RuntimeException("Node not found with id : " + nodeId));
            node.addFlag(result.getId());
            nodeRepository.save(node);
        }

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), exists ? Action.CREATE_FLAG : Action.EDIT_FLAG, username, LocalDateTime.now(), "flag", result.getId()));

        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Flag flag = flagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flag not found with id : " + id));
        flag.setDeleted(true);
        flagRepository.save(flag);

        kafkaTemplate.send(kafkaTopicName, new Log(UUID.randomUUID(), Action.DELETE_FLAG, username, LocalDateTime.now(), "flag", id));

        return ResponseEntity.ok("Flag was deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Flag>> findByIds(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("ids") List<UUID> ids) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Flag> flags = Lists.newArrayList();
        for(UUID id : ids) {
            flags.add(flagRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new RuntimeException("Flag not found with id : " + id)));
        }

        return ResponseEntity.ok(flags);
    }
}
