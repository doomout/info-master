package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;
import com.khg.info_master.security.UserPrincipal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")   // ★ H2 환경으로 테스트 실행!
@AutoConfigureMockMvc(addFilters = false) // (Security 있으면 필터 제거)
class QuestionControllerTest {

    @Autowired MockMvc mockMvc;

    @Autowired ObjectMapper objectMapper;

    @Autowired QuestionRepository questionRepository;
    @Autowired TagRepository tagRepository;
    @Autowired MemberRepository memberRepository;

    Long questionId;
    Long tagId;
    Member member;

    // 모의 로그인 메서드
    void mockLogin(Member member) {
        UserPrincipal principal = new UserPrincipal(member);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, List.of());

        SecurityContextHolder.getContext().setAuthentication(auth);
        }


    // 테스트 전 실행되는 초기화 메서드
    @BeforeEach
    void setup() {
        questionRepository.deleteAll();
        tagRepository.deleteAll();
        memberRepository.deleteAll();

        Member m = new Member();
        m.setEmail("test@test.com");
        m.setPassword("pw");
        m.setName("테스터");

        member = memberRepository.save(m);

        Tag tag = new Tag();
        tag.setName("보안");
        tagId = tagRepository.save(tag).getId();

        // 생성자 방식으로 객체 생성
        Question q = new Question();
                q.setExam_year(2024);
                q.setRound(1);
                q.setNumber(3);
                q.setQuestionText("SQL Injection 예방 방법은?");
                q.setDifficulty("중");
                q.setTag(tag);
                q.setMember(member);

        questionId = questionRepository.save(q).getId();
    }

    // CREATE 테스트
    @Test
    void 문제_생성_성공() throws Exception {
        mockLogin(member);
        Map<String, Object> dto = Map.of(
                "exam_year", 2025,
                "round", 2,
                "number", 7,
                "questionText", "트랜잭션이란 무엇인가?",
                "difficulty", "상",
                "tagId", tagId,
                "memberId", member.getId()
        );

        mockMvc.perform(post("/api/questions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    // READ 단건
    @Test
    void 문제_단건조회_성공() throws Exception {
        mockMvc.perform(get("/api/questions/" + questionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(questionId))
                .andExpect(jsonPath("$.tagName").value("보안"));
}
    // READ 전체
    @Test
    void 문제_전체조회_성공() throws Exception {
        mockMvc.perform(get("/api/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tagName").value("보안"));
    }

    // UPDATE (DTO 적용)
    @Test
    void 문제_수정_성공() throws Exception {
        mockLogin(member);
        Map<String, Object> dto = Map.of(
                "exam_year", 2025,
                "round", 3,
                "number", 10,
                "questionText", "OSI 7계층을 설명하시오.",
                "difficulty", "중",
                "tagId", tagId,
                "memberId", member.getId()
        );

        mockMvc.perform(put("/api/questions/" + questionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.number").value(10));
    }

    // DELETE 테스트
    @Test
    void 문제_삭제_성공() throws Exception {
        mockLogin(member);

        mockMvc.perform(delete("/api/questions/" + questionId))
                .andExpect(status().isOk())
                .andExpect(content().string("deleted"));
    }
}
