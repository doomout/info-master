package com.khg.info_master.dto.tag;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagResponseDTO {
    private Long id;
    private String name;
}
