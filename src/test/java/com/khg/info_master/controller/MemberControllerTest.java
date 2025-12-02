package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MemberControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired MemberRepository memberRepository;
    @Autowired ObjectMapper objectMapper;

    Long memberId;

    @BeforeEach
    void setup() {
        memberRepository.deleteAll();

        Member m = Member.builder()
                .email("test@test.com")
                .password("1234")
                .name("tester")
                .build();

        memberId = memberRepository.save(m).getId();
    }

    // ---------------------------
    // 1) 단건 조회 테스트
    // ---------------------------
    @Test
    void 회원_단건조회_성공() throws Exception {

        mockMvc.perform(get("/api/members/" + memberId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@test.com"))
                .andExpect(jsonPath("$.name").value("tester"));
    }

    // ---------------------------
    // 2) 전체 조회 테스트
    // ---------------------------
    @Test
    void 회원_전체조회_성공() throws Exception {

        mockMvc.perform(get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    // ---------------------------
    // 3) 회원 수정 테스트 (DTO 기반)
    // ---------------------------
    @Test
    void 회원_수정_성공() throws Exception {

        Map<String, Object> dto = Map.of(
                "email", "new@test.com",
                "password", "abcd",
                "name", "newtester"
        );

        mockMvc.perform(put("/api/members/" + memberId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("new@test.com"))
                .andExpect(jsonPath("$.name").value("newtester"));
    }

    // ---------------------------
    // 4) 회원 삭제 테스트
    // ---------------------------
    @Test
    void 회원_삭제_성공() throws Exception {

        mockMvc.perform(delete("/api/members/" + memberId))
                .andExpect(status().isOk());

        // 삭제 후 조회 시 4xx 발생해야 정상
        mockMvc.perform(get("/api/members/" + memberId))
                .andExpect(status().is4xxClientError());
    }
}
