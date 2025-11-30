package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void clean() {
        questionRepository.deleteAll();
    }

    @Test
    void 문제_생성_성공() throws Exception {

        QuestionCreateRequestDTO dto = new QuestionCreateRequestDTO();
        dto.setYear(2024);
        dto.setRound(1);
        dto.setSubject("정보시스템 구축관리");
        dto.setNumber(1);
        dto.setQuestionText("정규화 1~3NF를 설명하시오.");
        dto.setDifficulty("중");

        mockMvc.perform(post("/api/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.year").value(2024))
                .andExpect(jsonPath("$.round").value(1))
                .andExpect(jsonPath("$.subject").value("정보시스템 구축관리"))
                .andExpect(jsonPath("$.number").value(1))
                .andExpect(jsonPath("$.questionText").value("정규화 1~3NF를 설명하시오."));
    }
}
