package com.khg.info_master.service;

import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.QuestionTag;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.QuestionTagRepository;
import com.khg.info_master.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;
    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;

    // 태그 추가
    public QuestionTag addTag(Long questionId, Long tagId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("문제가 존재하지 않습니다."));

        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new IllegalArgumentException("태그가 존재하지 않습니다."));

        QuestionTag questionTag = QuestionTag.builder()
                .question(question)
                .tag(tag)
                .build();

        return questionTagRepository.save(questionTag);
    }

    // 태그 제거
    @Transactional
    public void removeTag(Long questionId, Long tagId) {
        questionTagRepository.deleteByQuestionIdAndTagId(questionId, tagId);
    }

    // 특정 문제의 태그 리스트
    public List<QuestionTag> getTagsByQuestion(Long questionId) {
        return questionTagRepository.findByQuestionId(questionId);
    }

    // 특정 태그가 붙은 문제 리스트
    public List<QuestionTag> getQuestionsByTag(Long tagId) {
        return questionTagRepository.findByTagId(tagId);
    }
}
