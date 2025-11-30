package com.khg.info_master.dto.answer;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerUpdateRequestDTO {

    @NotBlank(message = "답변 내용(answerText)은 비어 있을 수 없습니다.")
    private String answerText;

    private Integer score;
    private String comment;
}
