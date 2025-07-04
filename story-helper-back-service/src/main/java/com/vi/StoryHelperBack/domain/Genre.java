package com.vi.StoryHelperBack.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@AllArgsConstructor
@Table("genre")
public class Genre {
    @Id
    @PrimaryKey
    private UUID id;
    private String name;
    private String description;
    private boolean isDeleted;
}
