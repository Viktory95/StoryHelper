package com.vi.StoryHelperBack.repository;

import com.vi.StoryHelperBack.domain.Story;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StoryRepository extends CassandraRepository<Story, UUID> {
    List<Story> findAllByStUser(String stUser);
    List<Story> findAllByStUserAndIsDeleted(String stUser, boolean isDeleted);
}
