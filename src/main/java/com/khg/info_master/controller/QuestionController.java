package com.khg.info_master.controller;

import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
import com.khg.info_master.dto.answer.AnswerResponseDTO;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.dto.question.QuestionResponseDTO;
import com.khg.info_master.dto.question.QuestionUpdateRequestDTO;
import com.khg.info_master.service.AnswerService;
import com.khg.info_master.service.QuestionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final AnswerService answerService;

    // 생성 (관리자 계정만 필요)
    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody QuestionCreateRequestDTO dto
    ) {
        // 관리자 ID AdminContext는 지금은 의미만 있음
        //Long memberId = AdminContext.getAdminId(); 
        Long questionId = questionService.create(dto);
        QuestionResponseDTO response = questionService.toResponseDTO(questionService.get(questionId));
        return ResponseEntity.ok(response);
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
    public QuestionResponseDTO update(
            @PathVariable Long id,
            @RequestBody QuestionUpdateRequestDTO dto
    ) {
        Question updated = questionService.update(id, dto);
        return questionService.toResponseDTO(updated);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.ok().build();
    }

    // 답안 생성 / 수정 (upsert)(관리자)
    @PutMapping("/{questionId}/answer")
    public AnswerResponseDTO upsertAnswer(
            @PathVariable Long questionId,
            @Valid @RequestBody AnswerCreateRequestDTO dto
    ) {
        return answerService.upsertAnswer(
                questionId,
                dto.getAnswerText()
        );
    }
}

