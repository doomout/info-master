package com.khg.info_master.controller;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.QuestionListDTO;
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

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return tagService.create(tag);
    }

    @GetMapping("/{id}")
    public Tag get(@PathVariable Long id) {
        return tagService.get(id);
    }

    @GetMapping
    public List<Tag> getAll() {
        return tagService.getAll();
    }

    @PutMapping("/{id}")
    public Tag update(@PathVariable Long id, @RequestBody Tag updated) {
        return tagService.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        tagService.delete(id);
        return "deleted";
    }

    @GetMapping("/{tagId}/questions")
    public List<QuestionListDTO> getQuestionsByTag(@PathVariable Long tagId) {
        return questionTagService.getQuestionsByTagWithNames(tagId);
    }

}
