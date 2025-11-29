package com.khg.info_master.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagResponseDTO {
    private Long id;
    private String name;
}
