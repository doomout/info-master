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

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    public AnswerResponseDTO create(AnswerCreateRequestDTO dto) {

        // 1. DTO에서 값 꺼내기
        Long memberId = dto.getMemberId();
        Long questionId = dto.getQuestionId();

        // 2. 연관 엔티티 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));

        // 3. Answer 엔티티 생성
        Answer answer = new Answer();
        answer.setAnswerText(dto.getAnswerText());
        answer.setScore(dto.getScore());
        answer.setComment(dto.getComment());
        answer.setMember(member);
        answer.setQuestion(question);

        // 4. 저장
        Answer saved = answerRepository.save(answer);

        // 5. DTO 변환 후 반환
        return toDTO(saved);
    }

    public Answer get(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답안입니다."));
    }

    public List<Answer> getAll() {
        return answerRepository.findAll();
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
