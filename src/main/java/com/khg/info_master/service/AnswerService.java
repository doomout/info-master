package com.khg.info_master.service;

import com.khg.info_master.domain.Answer;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.dto.answer.AnswerUpdateRequestDTO;
import com.khg.info_master.repository.AnswerRepository;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    public AnswerResponseDTO create(AnswerCreateRequestDTO dto) {
        Long memberId = dto.getMemberId();
        Long questionId = dto.getQuestionId();

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));

        // 기존 답안 1개 확인
        Optional<Answer> existingOpt = answerRepository.findByQuestionId(questionId);

        Answer answer;
        if (existingOpt.isPresent()) {
            // UPDATE
            answer = existingOpt.get();
            answer.setAnswerText(dto.getAnswerText());
            answer.setMember(member);
        } else {
            // INSERT
            answer = new Answer();
            answer.setAnswerText(dto.getAnswerText());
            answer.setMember(member);
            answer.setQuestion(question);
        }

        Answer saved = answerRepository.save(answer);
        return toDTO(saved);
    }


    public Answer get(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답안입니다."));
    }

    public List<Answer> getAll() {
        return answerRepository.findAll();
    }

    // 추가: questionId로 답안 조회(답은 1개)
    public AnswerResponseDTO getByQuestion(Long questionId) {
        Answer answer = answerRepository.findByQuestionId(questionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제의 답변이 없습니다."));

        return toDTO(answer);
    }




    public AnswerResponseDTO update(Long id, AnswerUpdateRequestDTO dto) {

        Answer answer = get(id);

        answer.setAnswerText(dto.getAnswerText());
        answer.setScore(dto.getScore());
        answer.setComment(dto.getComment());

        Answer saved = answerRepository.save(answer);

        return toDTO(saved);
    }
    
    public void delete(Long id) {
        answerRepository.deleteById(id);
    }

    public AnswerResponseDTO toDTO(Answer answer) {
        return AnswerResponseDTO.builder()
            .id(answer.getId())
            .memberId(answer.getMember().getId())
            .questionId(answer.getQuestion().getId())
            .answerText(answer.getAnswerText())
            .score(answer.getScore())
            .comment(answer.getComment())
            .createdAt(answer.getCreatedAt())
            .build();
    }
}
