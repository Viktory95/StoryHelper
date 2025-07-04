package com.vi.StoryHelperBack.rest;

import com.datastax.oss.driver.shaded.guava.common.collect.Lists;
import com.vi.StoryHelperBack.domain.Genre;
import com.vi.StoryHelperBack.repository.GenreRepository;
import com.vi.StoryHelperBack.repository.StoryRepository;
import com.vi.StoryHelperBack.service.TokenCheckerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/genre")
@Slf4j
@RequiredArgsConstructor
public class GenreController {
    private final GenreRepository genreRepository;
    public final TokenCheckerService tokenCheckerService;

    //create or update
    @PutMapping
    public ResponseEntity<Genre> save(@RequestParam("token") String token, @RequestParam("username") String username, @RequestBody Genre entity) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (entity.getId() == null)
            entity.setId(UUID.randomUUID());

        return ResponseEntity.ok(genreRepository.save(entity));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam("token") String token, @RequestParam("username") String username, @PathVariable("id") UUID id) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found with id : " + id));
        genre.setDeleted(true);
        genreRepository.save(genre);

        return ResponseEntity.ok("Genre was deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Genre>> findByIds(@RequestParam("token") String token, @RequestParam("username") String username, @RequestParam("ids") List<UUID> ids) {
        boolean tokenIsValid = tokenCheckerService.checkToken(token, username);
        if (!tokenIsValid)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Genre> genres = Lists.newArrayList();
        for (UUID id : ids) {
            genres.add(genreRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new RuntimeException("Genre not found with id : " + id)));
        }

        return ResponseEntity.ok(genres);
    }
}
