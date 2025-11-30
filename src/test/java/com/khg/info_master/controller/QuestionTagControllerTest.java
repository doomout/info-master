package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.question.QuestionCreateRequestDTO;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;
import com.khg.info_master.repository.QuestionTagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionTagControllerTest {

    @Autowired MockMvc mockMvc;
    
    @Autowired QuestionTagRepository questionTagRepository;
    @Autowired QuestionRepository questionRepository;
    @Autowired TagRepository tagRepository;
    @Autowired MemberRepository memberRepository;

    @Autowired ObjectMapper objectMapper;

    Long questionId;
    Long tagId;

    @BeforeEach
void setup() {

    // DB 초기화 (순서 중요!)
    questionTagRepository.deleteAll();
    questionRepository.deleteAll();
    tagRepository.deleteAll();

    // --- 새 데이터 생성 ---

    Question q = Question.builder()
            .year(2024)
            .round(1)
            .subject("보안")
            .number(3)
            .questionText("SQL Injection 예방 방법은?")
            .difficulty("중")
            .build();
    questionId = questionRepository.save(q).getId();

    Tag tag = Tag.builder()
            .name("데이터베이스")
            .build();
    tagId = tagRepository.save(tag).getId();
}


    @Test
    void 문제에_태그_추가_성공() throws Exception {

        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.question.id").value(questionId))
                .andExpect(jsonPath("$.tag.id").value(tagId));
    }

    @Test
    void 문제에_태그_조회_성공() throws Exception {

        // 먼저 태그 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 태그 조회
        mockMvc.perform(get("/api/questions/" + questionId + "/tags"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tag.name").value("데이터베이스"));
    }

    @Test
    void 문제에_태그_중복추가_실패() throws Exception {

        // 1) 최초 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 2) 중복 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isBadRequest());
    }


    @Test
    void 문제에서_태그_삭제_성공() throws Exception {

        // 먼저 태그 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 삭제
        mockMvc.perform(delete("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk())
                .andExpect(content().string("deleted"));
    }
}
