package com.khg.info_master.controller;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.question.QuestionListDTO;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.khg.info_master.service.QuestionTagService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;
    private final QuestionTagService questionTagService;

    @GetMapping("/{id}")
    public TagResponseDTO get(@PathVariable Long id) {
        Tag tag = tagService.get(id);
        return tagService.toDTO(tag);
    }

    @GetMapping
    public List<TagResponseDTO> getAll() {
        return tagService.getAll().stream()
                .map(tagService::toDTO)
                .toList();
    }

    @PostMapping
    public TagResponseDTO create(@RequestBody Tag tag) {
        Tag saved = tagService.create(tag);
        return tagService.toDTO(saved);
    }

    @PutMapping("/{id}")
    public TagResponseDTO update(@PathVariable Long id, @RequestBody Tag tag) {
        Tag updated = tagService.update(id, tag);
        return tagService.toDTO(updated);
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
