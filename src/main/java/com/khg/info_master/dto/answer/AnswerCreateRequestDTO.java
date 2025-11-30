package com.khg.info_master.dto.answer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerCreateRequestDTO {

    @NotNull(message = "questionId는 필수입니다.")
    private Long questionId;

    @NotNull(message = "memberId는 필수입니다.")
    private Long memberId;

    @NotBlank(message = "답변 내용(answerText)은 비어 있을 수 없습니다.")
    private String answerText;   // ★ 핵심 필드 ✔

    private Integer score;

    private String comment;
}
