package com.khg.info_master.controller;

import com.khg.info_master.domain.QuestionTag;
import com.khg.info_master.service.QuestionTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionTagController {

    private final QuestionTagService questionTagService;

    // POST /api/questions/{questionId}/tags/{tagId}
    @PostMapping("/{questionId}/tags/{tagId}")
    public QuestionTag addTag(
            @PathVariable Long questionId,
            @PathVariable Long tagId
    ) {
        return questionTagService.addTag(questionId, tagId);
    }

    // DELETE /api/questions/{questionId}/tags/{tagId}
    @DeleteMapping("/{questionId}/tags/{tagId}")
    public String removeTag(
            @PathVariable Long questionId,
            @PathVariable Long tagId
    ) {
        questionTagService.removeTag(questionId, tagId);
        return "deleted";
    }

    // GET /api/questions/{questionId}/tags
    @GetMapping("/{questionId}/tags")
    public List<QuestionTag> getTags(@PathVariable Long questionId) {
        return questionTagService.getTagsByQuestion(questionId);
    }
}
