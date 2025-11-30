package com.khg.info_master.dto.answer;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AnswerResponseDTO {
    private Long id;
    private Long memberId;  // 작성자 ID
    private Long questionId;  // 질문 ID
    private String answerText;  // 답변 내용
    private Integer score; 
    private String comment;
    private LocalDateTime createdAt;
}
