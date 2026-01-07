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
    public Long create(QuestionCreateRequestDTO dto) {
        Tag tag = tagRepository.findById(dto.getTagId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));

        Question question = Question.builder()
                .examYear(dto.getExamYear())
                .round(dto.getRound())
                .number(dto.getNumber())
                .questionText(dto.getQuestionText())
                .difficulty(dto.getDifficulty())
                .tag(tag)
                .build();

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
    @Transactional
    public Question update(Long id, QuestionUpdateRequestDTO dto) {
        Question q = get(id);

        q.setExamYear(dto.getExamYear());
        q.setRound(dto.getRound());
        q.setNumber(dto.getNumber());
        q.setQuestionText(dto.getQuestionText());
        q.setDifficulty(dto.getDifficulty());

        return q;
    }

    // DELETE
    public void delete(Long id) {
        questionRepository.deleteById(id);
    }

    // DTO 변환
    public QuestionResponseDTO toResponseDTO(Question q) {

        AnswerResponseDTO answerDto = null;

        if (q.getAnswer() != null) {
            answerDto = AnswerResponseDTO.builder()
                    .id(q.getAnswer().getId())
                    .answerText(q.getAnswer().getAnswerText())
                    .score(q.getAnswer().getScore())
                    .comment(q.getAnswer().getComment())
                    .build();
        }

        return QuestionResponseDTO.builder()
                .id(q.getId())
                .examYear(q.getExamYear())
                .round(q.getRound())
                .number(q.getNumber())
                .questionText(q.getQuestionText())
                .difficulty(q.getDifficulty())
                .tagId(q.getTag().getId())
                .tagName(q.getTag().getName())
                .answer(answerDto)
                .build();
    }
}
