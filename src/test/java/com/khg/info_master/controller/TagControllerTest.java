package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@ActiveProfiles("test")   // ★ H2 환경으로 테스트 실행!
@AutoConfigureMockMvc(addFilters = false) // (Security 있으면 필터 제거)
class TagControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired TagRepository tagRepository;

    Long tagId;

    @BeforeEach
    void setup() {
        tagRepository.deleteAll();

        Tag tag = Tag.builder()
                .name("보안")
                .build();

        tagId = tagRepository.save(tag).getId();
    }

    // CREATE 테스트
    @Test
    void 태그_생성_성공() throws Exception {

        Map<String, Object> dto = Map.of(
                "name", "데이터베이스"
        );

        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("데이터베이스"));
    }

    // CREATE 중복 실패
    @Test
    void 태그_중복_생성_실패() throws Exception {

        Map<String, Object> dto = Map.of(
                "name", "보안"    // 이미 존재
        );

        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    // READ 단건 조회
    @Test
    void 태그_단건조회_성공() throws Exception {

        mockMvc.perform(get("/api/tags/" + tagId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(tagId))
                .andExpect(jsonPath("$.name").value("보안"));
    }

    // READ 전체 조회
    @Test
    void 태그_전체조회_성공() throws Exception {

        mockMvc.perform(get("/api/tags"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("보안"));
    }

    // UPDATE 테스트
    @Test
    void 태그_수정_성공() throws Exception {

        Map<String, Object> dto = Map.of(
                "name", "네트워크"
        );

        mockMvc.perform(put("/api/tags/" + tagId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("네트워크"));
    }

    // DELETE 테스트
    @Test
    void 태그_삭제_성공() throws Exception {

        mockMvc.perform(delete("/api/tags/" + tagId))
                .andExpect(status().isOk());

        // 삭제 후 조회 -> 400 (예외 처리)
        mockMvc.perform(get("/api/tags/" + tagId))
                .andExpect(status().isBadRequest());
    }
}
