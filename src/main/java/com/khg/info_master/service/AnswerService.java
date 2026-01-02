package com.khg.info_master.service;

import com.khg.info_master.domain.Answer;
import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final QuestionRepository questionRepository;

    /**
     * 답안 생성 또는 수정 (upsert)
     * - 답안이 없으면 생성
     * - 답안이 있으면 수정
     * - 항상 Question을 통해 접근
     */
    @Transactional
    public AnswerResponseDTO upsertAnswer(
            Long questionId,
            String answerText
    ) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));
        
        Answer answer = question.getAnswer();

        if (answer == null) {
            // CREATE
            answer = new Answer();
            answer.setQuestion(question);
            answer.setAnswerText(answerText);

            // 🔥 연관관계 설정 (Question이 Aggregate Root)
            question.setAnswer(answer);
        } else {
            // UPDATE
            answer.setAnswerText(answerText);
        }

        // AnswerRepository.save() 호출 ❌
        // → Question이 영속 상태이므로 cascade로 자동 처리

        return toDTO(answer);
    }

    private AnswerResponseDTO toDTO(Answer answer) {
        return AnswerResponseDTO.builder()
                .id(answer.getId())
                .questionId(answer.getQuestion().getId())
                .answerText(answer.getAnswerText())
                .score(answer.getScore())
                .comment(answer.getComment())
                .createdAt(answer.getCreatedAt())
                .build();
    }
}
