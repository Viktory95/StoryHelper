package com.vi.StoryHelperBack.rest;

import com.vi.StoryHelperBack.domain.View;
import com.vi.StoryHelperBack.repository.ViewRepository;
import com.vi.StoryHelperBack.service.TokenCheckerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/view")
@Slf4j
@RequiredArgsConstructor
public class ViewController {
    private final ViewRepository viewRepository;
    private final TokenCheckerService tokenCheckerService;

    //create or update
    @PutMapping
    public ResponseEntity<View> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestBody View entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        return ResponseEntity.ok(viewRepository.save(entity));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        View view = viewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("View not found with id : " + id));
        view.setDeleted(true);
        viewRepository.save(view);

        return ResponseEntity.ok("View was deleted successfully!");
    }
}
