package com.khg.info_master.service;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.tag.TagCreateRequestDTO;
import com.khg.info_master.dto.tag.TagResponseDTO;
import com.khg.info_master.dto.tag.TagUpdateRequestDTO;
import com.khg.info_master.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    // CREATE를 DTO 사용하여 처리
    public TagResponseDTO create(TagCreateRequestDTO dto) {

        // 1) 중복 체크
        if (tagRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("이미 존재하는 태그입니다.");
        }

        // 2) 엔티티 생성
        Tag tag = Tag.builder()
                .name(dto.getName())
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
        return TagResponseDTO.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

}
