package com.khg.info_master.controller;

import com.khg.info_master.domain.Answer;
import com.khg.info_master.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    // POST /api/answers?memberId=1&questionId=3
    @PostMapping
    public Answer create(
            @RequestParam Long memberId,
            @RequestParam Long questionId,
            @RequestBody Answer answer
    ) {
        return answerService.create(memberId, questionId, answer);
    }

    @GetMapping("/{id}")
    public Answer get(@PathVariable Long id) {
        return answerService.get(id);
    }

    @GetMapping
    public List<Answer> getAll() {
        return answerService.getAll();
    }

    @PutMapping("/{id}")
    public Answer update(@PathVariable Long id, @RequestBody Answer updated) {
        return answerService.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        answerService.delete(id);
        return "deleted";
    }
}
