package com.khg.info_master.service;

import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.dto.question.QuestionResponseDTO;
import com.khg.info_master.dto.question.QuestionUpdateRequestDTO;

import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;

    // CREATE
    @Transactional
    public Long create(QuestionCreateRequestDTO dto, Long memberId) {
        Tag tag = tagRepository.findById(dto.getTagId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그"));

        Question question = new Question();
        question.setExam_year(dto.getExam_year());
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
    public Question update(Long id, QuestionUpdateRequestDTO dto, Long memberId) {

        Question q = get(id);
        q.setExam_year(dto.getExam_year());
        q.setRound(dto.getRound());
        q.setNumber(dto.getNumber());
        q.setQuestionText(dto.getQuestionText());
        q.setDifficulty(dto.getDifficulty());

        return questionRepository.save(q);
    }


    // DELETE
    public void delete(Long id, Long memberId) {
        questionRepository.deleteById(id);
    }

    // DTO 변환 (기본)
    public QuestionResponseDTO toResponseDTO(Question q) {
        AnswerResponseDTO answerDto = null;

        if (q.getAnswer() != null) {
            answerDto = AnswerResponseDTO.builder()
                    .id(q.getAnswer().getId())
                    .answerText(q.getAnswer().getAnswerText())
                    .score(q.getAnswer().getScore())
                    .comment(q.getAnswer().getComment())
                    .createdAt(q.getAnswer().getCreatedAt())
                    .build();
        }

        return new QuestionResponseDTO(
            q.getId(),
            q.getExam_year(),
            q.getRound(),
            q.getNumber(),
            q.getQuestionText(),
            q.getDifficulty(),
            q.getCreatedAt(),
            q.getUpdatedAt(),
            q.getTag().getId(),
            q.getTag().getName(),
            answerDto           // ✅ 마지막 파라미터 추가
        );
    }

}
