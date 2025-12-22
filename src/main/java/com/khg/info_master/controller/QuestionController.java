package com.khg.info_master.controller;

import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.dto.question.QuestionResponseDTO;
import com.khg.info_master.dto.question.QuestionUpdateRequestDTO;

import com.khg.info_master.security.UserPrincipal;
import com.khg.info_master.service.QuestionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    // 생성 (로그인 체크 추가)
    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody QuestionCreateRequestDTO dto,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        Long id = questionService.create(dto, user.getId()); 
        return ResponseEntity.ok(id);
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
    public String delete(@PathVariable Long id) {
        questionService.delete(id);
        return "deleted";
    }
}

