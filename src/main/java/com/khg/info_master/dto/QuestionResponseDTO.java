package com.khg.info_master.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class QuestionResponseDTO {

    private Long id;
    private Integer year;
    private Integer round;
    private String subject;
    private Integer number;
    private String questionText;
    private String difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<String> tags;   // 🔥 핵심: 태그 이름 목록
}
