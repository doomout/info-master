package com.khg.info_master.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionCreateRequestDTO {


    @NotNull
    private Integer exam_year;

    @NotNull
    private Integer round;

    @NotNull
    private Integer number;

    @NotBlank
    private String questionText;

    @NotNull
    private Long tagId;

    private String difficulty;
}
