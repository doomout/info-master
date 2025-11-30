package com.khg.info_master.service;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public TagResponseDTO create(String name) {

        // 1) 중복 검사
        if (tagRepository.existsByName(name)) {
            throw new IllegalArgumentException("이미 존재하는 태그입니다.");
        }

        // 2) 엔티티 생성
        Tag tag = Tag.builder()
                .name(name)
                .build();

        // 3) 저장
        Tag saved = tagRepository.save(tag);

        // 4) DTO 변환
        return toDTO(saved);
    }


    public Tag get(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
    }

    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    public Tag update(Long id, Tag updated) {
        Tag tag = get(id);
        tag.setName(updated.getName());
        return tagRepository.save(tag);
    }

    public void delete(Long id) {
        tagRepository.deleteById(id);
    }

    // DTO 변환 메서드
    public TagResponseDTO toDTO(Tag tag) {
        return TagResponseDTO.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

}
