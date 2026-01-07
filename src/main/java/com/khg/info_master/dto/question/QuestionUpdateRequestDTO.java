package com.khg.info_master.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionUpdateRequestDTO {

    @NotNull(message = "출제 년도는 필수입니다.")
    private Integer examYear;

    @NotNull(message = "회차는 필수입니다.")
    private Integer round;

    @NotNull(message = "문제 번호는 필수입니다.")
    private Integer number;

    @NotBlank(message = "문제는 비어 있을 수 없습니다.")
    private String questionText;

    private String difficulty; // 선택 값

    @NotNull(message = "카테고리는 필수입니다.")
    private Long tagId;
}
