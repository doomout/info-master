package com.khg.info_master.controller;

import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.question.QuestionResponseDTO;
import com.khg.info_master.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    // 생성
    @PostMapping
    public QuestionResponseDTO create(@RequestBody Question q) {
        return questionService.toResponseDTO(questionService.create(q));
    }

    // 단일 조회
    @GetMapping("/{id}")
    public QuestionResponseDTO get(@PathVariable Long id) {
        return questionService.toResponseDTO(questionService.get(id));
    }

    // 전체 조회
    @GetMapping
    public List<QuestionResponseDTO> getAll() {
        return questionService.getAll().stream()
                .map(questionService::toResponseDTO)
                .toList();
    }

    // 수정
    @PutMapping("/{id}")
    public QuestionResponseDTO update(@PathVariable Long id, @RequestBody Question update) {
        Question updated = questionService.update(id, update);
        return questionService.toResponseDTO(updated);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        questionService.delete(id);
        return "deleted";
    }

    // 상세 조회 (태그 포함)
    @GetMapping("/{id}/detail")
    public QuestionResponseDTO getDetail(@PathVariable Long id) {
        return questionService.getQuestionWithTags(id);
    }
}

