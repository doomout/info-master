package com.khg.info_master.controller;

import com.khg.info_master.dto.question.QuestionListDTO;
import com.khg.info_master.dto.tag.TagCreateRequestDTO;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.dto.tag.TagUpdateRequestDTO;
import com.khg.info_master.service.QuestionTagService;
import com.khg.info_master.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;
    private final QuestionTagService questionTagService;

    @GetMapping("/{id}")
    public TagResponseDTO get(@PathVariable Long id) {
        return tagService.toDTO(tagService.get(id));
    }

    @GetMapping
    public List<TagResponseDTO> getAll() {
        return tagService.getAll().stream()
                .map(tagService::toDTO)
                .toList();
    }

    @PostMapping
    public TagResponseDTO create(@RequestBody TagCreateRequestDTO dto) {
        return tagService.create(dto);    // ← 서비스가 전체 처리
    }

    @PutMapping("/{id}")
    public TagResponseDTO update(
            @PathVariable Long id,
            @RequestBody TagUpdateRequestDTO dto
    ) {
        return tagService.toDTO(tagService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tagService.delete(id);
    }

    // 태그별 문제 조회
    @GetMapping("/{tagId}/questions")
    public List<QuestionListDTO> getQuestionsByTag(@PathVariable Long tagId) {
        return questionTagService.getQuestionsByTagWithNames(tagId);
    }
}
