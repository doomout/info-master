package com.khg.info_master.repository;

import com.khg.info_master.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    boolean existsByName(String name); 
}
