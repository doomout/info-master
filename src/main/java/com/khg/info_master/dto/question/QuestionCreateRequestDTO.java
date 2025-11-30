package com.khg.info_master.dto.question;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
public class QuestionCreateRequestDTO {

    @NotBlank(message = "질문 제목은 비어 있을 수 없습니다.")
    private String title;

    @NotBlank(message = "질문 내용은 비어 있을 수 없습니다.")
    private String content;

    @NotNull(message = "memberId는 필수값입니다.")
    private Long memberId;

    // 태그 ID 리스트(선택)
    private List<Long> tagIds;
}
