package com.khg.info_master.dto.question;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class QuestionListDTO {
    private Long id;
    private String subject;
    private Integer number;
    private List<String> tags;
}
