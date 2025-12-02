package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;
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
class QuestionTagControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Autowired QuestionRepository questionRepository;
    @Autowired TagRepository tagRepository;
    @Autowired MemberRepository memberRepository;

    Long questionId;
    Long tagId;

    @BeforeEach
    void setup() {
        tagRepository.deleteAll();
        questionRepository.deleteAll();
        memberRepository.deleteAll();

        // Member 생성 (Question 생성 시 필요할 수도 있음)
        Member m = Member.builder()
                .email("test@test.com")
                .password("1234")
                .name("tester")
                .build();
        memberRepository.save(m);

        // Question 생성
        Question q = Question.builder()
                .year(2024)
                .round(1)
                .subject("보안")
                .number(3)
                .questionText("SQL Injection 예방 방법은?")
                .difficulty("중")
                .build();

        questionId = questionRepository.save(q).getId();

        // Tag 생성
        Tag tag = Tag.builder().name("데이터베이스").build();
        tagId = tagRepository.save(tag).getId();
    }

    // 1️⃣ 문제에 태그 추가 성공
    @Test
    void 문제에_태그_추가_성공() throws Exception {

        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.question.id").value(questionId))
                .andExpect(jsonPath("$.tag.id").value(tagId));
    }

    // 2️⃣ 문제에 태그 중복 추가 실패
    @Test
    void 문제에_태그_중복추가_실패() throws Exception {

        // 최초 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 중복 추가 → UNIQUE (question_id, tag_id) 위반
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isBadRequest());
    }

    // 3️⃣ 문제에 등록된 태그 조회
    @Test
    void 문제에_등록된_태그_조회_성공() throws Exception {

        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/questions/" + questionId + "/tags"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tag.name").value("데이터베이스"));
    }

    // 4️⃣ 문제에서 태그 삭제 성공
    @Test
    void 문제에서_태그_삭제_성공() throws Exception {

        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk())
                .andExpect(content().string("deleted"));
    }

    // 5️⃣ 삭제 후 다시 추가 가능해야 함
    @Test
    void 태그삭제후_재추가_성공() throws Exception {

        // 추가
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 삭제
        mockMvc.perform(delete("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());

        // 다시 추가 → 성공해야 정상
        mockMvc.perform(post("/api/questions/" + questionId + "/tags/" + tagId))
                .andExpect(status().isOk());
    }

    // 6️⃣ 존재하지 않는 문제로 태그 추가 → 실패
    @Test
    void 존재하지않는_문제에_태그추가_실패() throws Exception {

        mockMvc.perform(post("/api/questions/999999/tags/" + tagId))
                .andExpect(status().isBadRequest());
    }

    // 7️⃣ 존재하지 않는 태그 매핑 → 실패
    @Test
    void 존재하지않는_태그_매핑_실패() throws Exception {

        mockMvc.perform(post("/api/questions/" + questionId + "/tags/999999"))
                .andExpect(status().isBadRequest());
    }
}
