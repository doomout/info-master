package com.khg.info_master.dto.tag;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagUpdateRequestDTO {

    @NotBlank(message = "태그 이름은 비어 있을 수 없습니다.")
    private String name;
}
