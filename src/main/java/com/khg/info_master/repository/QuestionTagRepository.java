package com.khg.info_master.repository;

import com.khg.info_master.domain.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {

    List<QuestionTag> findByQuestionId(Long questionId);

    List<QuestionTag> findByTagId(Long tagId);

    void deleteByQuestionIdAndTagId(Long questionId, Long tagId);
}
