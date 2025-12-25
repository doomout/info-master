package com.khg.info_master.service;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.dto.tag.TagUpdateRequestDTO;
import com.khg.info_master.repository.TagRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<Tag> findAll() {
        return tagRepository.findAll(Sort.by("id"));
    }

    @Transactional
    public Long create(String name) {
        tagRepository.findByName(name)
            .ifPresent(t -> {
                throw new IllegalArgumentException("이미 존재하는 태그입니다.");
            });

        Tag tag = new Tag();
        tag.setName(name);
        tagRepository.save(tag);

        return tag.getId();
    }

    public Tag get(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
    }

    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    // UPDATE를 DTO 사용하여 처리
    public Tag update(Long id, TagUpdateRequestDTO dto) {
        Tag tag = get(id);
        tag.setName(dto.getName());
        return tagRepository.save(tag);
    }


    public void delete(Long id) {
        tagRepository.deleteById(id);
    }

    // DTO 변환 메서드
    public TagResponseDTO toDTO(Tag tag) {
        return new TagResponseDTO(
                tag.getId(),
                tag.getName()
        );
    }
}
