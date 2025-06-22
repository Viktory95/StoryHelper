package com.vi.StoryHelperBack.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@Table("story")
public class Story {
    @Id
    @PrimaryKey
    private UUID id;
    private String name;
    private List<UUID> genres;
    private List<UUID> characters;
    private List<UUID> nodes;
    private UUID style;
    private UUID stView;
    private String stUser;
    private boolean isPublic;
    private String fullText;
    private boolean isDeleted;

    public void addCharacter(UUID character) {
        characters.add(character);
    }

    public void addGenre(UUID genre) {
        genres.add(genre);
    }

    public void addNode(UUID node) {
        nodes.add(node);
    }

    public void removeCharacter(UUID character) {
        characters.remove(character);
    }

    public void removeGenre(UUID genre) {
        genres.remove(genre);
    }

    public void removeNode(UUID node) {
        nodes.remove(node);
    }
}
