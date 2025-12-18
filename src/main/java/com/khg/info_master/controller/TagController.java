package com.khg.info_master.controller;

import com.khg.info_master.dto.tag.TagCreateRequestDTO;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.dto.tag.TagUpdateRequestDTO;
import com.khg.info_master.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

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
        Long id = tagService.create(dto.getName()); // create(String) 호출
        return tagService.toDTO(tagService.get(id));
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
}
