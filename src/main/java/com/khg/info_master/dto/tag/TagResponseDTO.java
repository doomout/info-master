package com.khg.info_master.dto.tag;

import com.khg.info_master.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TagResponseDTO {
    private Long id;
    private String name;

    public static TagResponseDTO from(Tag tag) {
        return new TagResponseDTO(tag.getId(), tag.getName());
    }
}
