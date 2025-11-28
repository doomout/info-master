package com.khg.info_master.controller;

import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.QuestionResponseDTO;
import com.khg.info_master.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public Question create(@RequestBody Question q) {
        return questionService.create(q);
    }

    @GetMapping("/{id}")
    public Question get(@PathVariable Long id) {
        return questionService.get(id);
    }

    @GetMapping
    public List<Question> getAll() {
        return questionService.getAll();
    }

    @PutMapping("/{id}")
    public Question update(@PathVariable Long id, @RequestBody Question update) {
        return questionService.update(id, update);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        questionService.delete(id);
        return "deleted";
    }
    @GetMapping("/{id}/detail")
    public QuestionResponseDTO getDetail(@PathVariable Long id) {
        return questionService.getQuestionWithTags(id);
    }

}
