package com.khg.info_master.service;

import com.khg.info_master.domain.Tag;
import com.khg.info_master.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public Tag create(Tag tag) {
        return tagRepository.save(tag);
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
}
