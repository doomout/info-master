package com.khg.info_master.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.khg.info_master.dto.answer.AnswerResponseDTO;


@Getter
@Builder
@AllArgsConstructor
public class QuestionResponseDTO {

    private Long id;
    private Integer examYear;
    private Integer round;
    private Integer number;
    private String questionText;
    private String difficulty;

    // 단일 태그
    private Long tagId;
    private String tagName;

     // 🔥 추가
    private AnswerResponseDTO answer;
}
