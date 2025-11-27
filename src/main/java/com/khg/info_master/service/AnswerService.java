package com.khg.info_master.service;

import com.khg.info_master.domain.Answer;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
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

    public Answer create(Long memberId, Long questionId, Answer answer) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));

        answer.setMember(member);
        answer.setQuestion(question);

        return answerRepository.save(answer);
    }

    public Answer get(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답안입니다."));
    }

    public List<Answer> getAll() {
        return answerRepository.findAll();
    }

    public Answer update(Long id, Answer updated) {
        Answer answer = get(id);

        answer.setAnswerText(updated.getAnswerText());
        answer.setScore(updated.getScore());
        answer.setComment(updated.getComment());

        return answerRepository.save(answer);
    }

    public void delete(Long id) {
        answerRepository.deleteById(id);
    }
}
