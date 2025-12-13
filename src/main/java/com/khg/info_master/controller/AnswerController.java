package com.khg.info_master.controller;

import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.dto.answer.AnswerUpdateRequestDTO;
import com.khg.info_master.service.AnswerService;

import jakarta.validation.Valid;
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
        return answerService.toDTO(answerService.get(id));
    }

    @GetMapping
    public List<AnswerResponseDTO> getAll() {
        return answerService.getAll()
                .stream()
                .map(answerService::toDTO)
                .toList();
    }

    @PostMapping
    public AnswerResponseDTO create(
            @Valid @RequestBody AnswerCreateRequestDTO dto
    ) {
        return answerService.create(dto);
    }

    @PutMapping("/{id}")
    public AnswerResponseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody AnswerUpdateRequestDTO dto
    ) {
        return answerService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        answerService.delete(id);
    }

    // 추가: questionId로 답안 조회
    @GetMapping("/question/{questionId}")
    public List<AnswerResponseDTO> getByQuestion(@PathVariable Long questionId) {
        return answerService.getByQuestion(questionId);
    }
}
