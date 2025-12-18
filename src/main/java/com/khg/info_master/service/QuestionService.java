package com.khg.info_master.service;

import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.QuestionTag;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.dto.question.QuestionResponseDTO;
import com.khg.info_master.dto.question.QuestionUpdateRequestDTO;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.QuestionTagRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionTagRepository questionTagRepository;

    // CREATE
    @Transactional
    public Long create(QuestionCreateRequestDTO dto) {

        Tag tag = tagRepository.findById(dto.getTagId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그"));

        Question question = new Question();
        question.setExam_Year(dto.getExam_year());
        question.setRound(dto.getRound());
        question.setNumber(dto.getNumber());
        question.setQuestionText(dto.getQuestionText());
        question.setDifficulty(dto.getDifficulty());
        question.setTag(tag);

        questionRepository.save(question);
        return question.getId();
    }

    // READ
    public Question get(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    // UPDATE
    public Question update(Long id, QuestionUpdateRequestDTO dto) {

        Question q = get(id);

        q.setYear(dto.getYear());
        q.setRound(dto.getRound());
        q.setSubject(dto.getSubject());
        q.setNumber(dto.getNumber());
        q.setQuestionText(dto.getQuestionText());
        q.setDifficulty(dto.getDifficulty());

        return questionRepository.save(q);
    }


    // DELETE
    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

    // DTO 변환 (기본)
    public QuestionResponseDTO toResponseDTO(Question q) {
        return QuestionResponseDTO.builder()
                .id(q.getId())
                .year(q.getYear())
                .round(q.getRound())
                .subject(q.getSubject())
                .number(q.getNumber())
                .questionText(q.getQuestionText())
                .difficulty(q.getDifficulty())
                .createdAt(q.getCreatedAt())
                .updatedAt(q.getUpdatedAt())
                .tags(null) // 기본 조회는 태그 없음
                .build();
    }

    // 상세 조회 + 태그 포함
    public QuestionResponseDTO getQuestionWithTags(Long id) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));

        // 문제의 태그 목록 조회
        List<QuestionTag> tags = questionTagRepository.findByQuestionId(id);

        // Tag 이름만 리스트로 추출
        List<String> tagNames = tags.stream()
                .map(qt -> qt.getTag().getName())
                .toList();

        return QuestionResponseDTO.builder()
                .id(question.getId())
                .year(question.getYear())
                .round(question.getRound())
                .subject(question.getSubject())
                .number(question.getNumber())
                .questionText(question.getQuestionText())
                .difficulty(question.getDifficulty())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .tags(tagNames)
                .build();
    }
}
