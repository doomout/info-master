package com.khg.info_master.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

import com.khg.info_master.dto.answer.AnswerResponseDTO;


@Getter
@AllArgsConstructor
public class QuestionResponseDTO {

    private Long id;
    private Integer exam_year;
    private Integer round;
    private Integer number;
    private String questionText;
    private String difficulty;

    // 시스템 메타데이터
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 단일 태그
    private Long tagId;
    private String tagName;

     // 🔥 추가
    private AnswerResponseDTO answer;
}
