package com.khg.info_master.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionCreateRequestDTO {

    @NotNull(message = "year는 필수입니다.")
    private Integer year;

    @NotNull(message = "round는 필수입니다.")
    private Integer round;

    // @NotBlank(message = "subject는 비어 있을 수 없습니다.")
    // private String subject;

    @NotNull(message = "문제 번호(number)는 필수입니다.")
    private Integer number;

    @NotBlank(message = "문제는 비어 있을 수 없습니다.")
    private String questionText;

    private String difficulty;   // 선택 값
}
