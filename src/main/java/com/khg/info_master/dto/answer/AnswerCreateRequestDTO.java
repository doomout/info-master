package com.khg.info_master.dto.answer;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerCreateRequestDTO {
    @NotBlank(message = "답변 내용(answerText)은 비어 있을 수 없습니다.")
    private String answerText;   
}
