package com.vi.StoryHelperBack.repository;

import com.vi.StoryHelperBack.domain.Flag;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FlagRepository extends CassandraRepository<Flag, UUID> {
    Optional<Flag> findByIdAndIsDeleted(UUID id, boolean b);
}
