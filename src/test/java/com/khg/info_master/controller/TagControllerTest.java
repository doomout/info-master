package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.dto.tag.TagCreateRequestDTO;
import com.khg.info_master.repository.TagRepository;
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
class TagControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void clean() {
        tagRepository.deleteAll();
    }

    @Test
    void 태그_생성_성공() throws Exception {

        TagCreateRequestDTO dto = new TagCreateRequestDTO();
        dto.setName("데이터베이스");

        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("데이터베이스"));
    }

    @Test
    void 태그_중복_실패() throws Exception {

        // 1) 첫 번째 태그 생성
        TagCreateRequestDTO dto1 = new TagCreateRequestDTO();
        dto1.setName("보안");

        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto1)))
                .andExpect(status().isOk());

        // 2) 동일 이름으로 태그 생성 → 실패해야 함
        TagCreateRequestDTO dto2 = new TagCreateRequestDTO();
        dto2.setName("보안");

        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto2)))
                .andExpect(status().isBadRequest()); // 글로벌 예외 핸들러 기준
    }
}
