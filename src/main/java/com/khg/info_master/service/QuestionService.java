package com.khg.info_master.service;

import com.khg.info_master.domain.Question;
import com.khg.info_master.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Question create(Question q) {
        return questionRepository.save(q);
    }

    public Question get(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 문제입니다."));
    }

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question update(Long id, Question update) {
        Question q = get(id);

        q.setYear(update.getYear());
        q.setRound(update.getRound());
        q.setSubject(update.getSubject());
        q.setNumber(update.getNumber());
        q.setQuestionText(update.getQuestionText());
        q.setDifficulty(update.getDifficulty());

        return questionRepository.save(q);
    }

    public void delete(Long id) {
        questionRepository.deleteById(id);
    }
}
