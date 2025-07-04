package com.vi.StoryHelperBack.rest;

import com.vi.StoryHelperBack.domain.Style;
import com.vi.StoryHelperBack.repository.StyleRepository;
import com.vi.StoryHelperBack.service.TokenCheckerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/style")
@Slf4j
@RequiredArgsConstructor
public class StyleController {
    private final StyleRepository styleRepository;
    private final TokenCheckerService tokenCheckerService;

    //create or update
    @PutMapping
    public ResponseEntity<Style> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestBody Style entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        return ResponseEntity.ok(styleRepository.save(entity));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Style style = styleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Style not found with id : " + id));
        style.setDeleted(true);
        styleRepository.save(style);

        return ResponseEntity.ok("Style was deleted successfully!");
    }
}
