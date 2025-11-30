package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.dto.member.MemberCreateRequestDTO;
import com.khg.info_master.repository.MemberRepository;
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
class MemberControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void clean() {
        memberRepository.deleteAll();
    }

    @Test
    void 회원_생성_성공() throws Exception {

        // DTO 만들기
        MemberCreateRequestDTO dto = new MemberCreateRequestDTO();
        dto.setEmail("test@test.com");
        dto.setPassword("123456");
        dto.setName("홍길동");

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@test.com"))
                .andExpect(jsonPath("$.name").value("홍길동"));
    }

    @Test
    void 회원_이메일_중복_실패() throws Exception {

        // 1) 첫 번째 회원 생성
        MemberCreateRequestDTO dto1 = new MemberCreateRequestDTO();
        dto1.setEmail("dup@test.com");
        dto1.setPassword("111111");
        dto1.setName("첫번째");

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto1)))
                .andExpect(status().isOk());

        // 2) 두번째 회원 생성 (중복 이메일)
        MemberCreateRequestDTO dto2 = new MemberCreateRequestDTO();
        dto2.setEmail("dup@test.com");
        dto2.setPassword("222222");
        dto2.setName("두번째");

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto2)))
                .andExpect(status().isBadRequest()); // 글로벌 예외 처리에 따라 400 또는 409
    }
}
