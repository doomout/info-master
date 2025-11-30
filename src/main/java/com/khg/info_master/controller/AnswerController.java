package com.khg.info_master.controller;

import com.khg.info_master.domain.Answer;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping("/{id}")
    public AnswerResponseDTO get(@PathVariable Long id) {
        Answer answer = answerService.get(id);
        return answerService.toDTO(answer);
    }

    @GetMapping
    public List<AnswerResponseDTO> getAll() {
        return answerService.getAll().stream()
                .map(answerService::toDTO)
                .toList();
    }

    @PostMapping("/{memberId}/{questionId}")
    public AnswerResponseDTO create(
            @PathVariable Long memberId,
            @PathVariable Long questionId,
            @RequestBody Answer answer
    ) {
        Answer created = answerService.create(memberId, questionId, answer);
        return answerService.toDTO(created);
    }

    @PutMapping("/{id}")
    public AnswerResponseDTO update(@PathVariable Long id, @RequestBody Answer answer) {
        Answer updated = answerService.update(id, answer);
        return answerService.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        answerService.delete(id);
    }
}
