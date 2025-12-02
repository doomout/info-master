package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
import com.khg.info_master.dto.answer.AnswerUpdateRequestDTO;
import com.khg.info_master.repository.AnswerRepository;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
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
class AnswerControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Autowired MemberRepository memberRepository;
    @Autowired QuestionRepository questionRepository;
    @Autowired AnswerRepository answerRepository;

    Long memberId;
    Long questionId;
    Long answerId;

    @BeforeEach
    void setup() {

        answerRepository.deleteAll();
        questionRepository.deleteAll();
        memberRepository.deleteAll();

        // 1) Member 생성
        Member m = Member.builder()
                .email("test@test.com")
                .password("1234")
                .name("tester")
                .build();
        memberId = memberRepository.save(m).getId();

        // 2) Question 생성
        Question q = Question.builder()
                .year(2024)
                .round(1)
                .subject("보안")
                .number(1)
                .questionText("XSS 방지 방법은?")
                .difficulty("중")
                .build();
        questionId = questionRepository.save(q).getId();

        // 3) 초기 Answer 생성
        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setMemberId(memberId);
        dto.setQuestionId(questionId);
        dto.setAnswerText("정답입니다.");
        dto.setScore(80);
        dto.setComment("좋아요");

        // JSON → POST 호출
        try {
            String json = objectMapper.writeValueAsString(dto);
            String response = mockMvc.perform(post("/api/answers")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(json))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            // 응답에서 answerId 추출
            Map<String, Object> map = objectMapper.readValue(response, Map.class);
            answerId = Long.valueOf(map.get("id").toString());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // CREATE
    @Test
    void 답변_생성_성공() throws Exception {

        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setMemberId(memberId);
        dto.setQuestionId(questionId);
        dto.setAnswerText("새로운 답변입니다.");
        dto.setScore(90);
        dto.setComment("잘 작성됨");

        mockMvc.perform(post("/api/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("새로운 답변입니다."))
                .andExpect(jsonPath("$.memberId").value(memberId))
                .andExpect(jsonPath("$.questionId").value(questionId));
    }

    // READ 단건
    @Test
    void 답변_단건조회_성공() throws Exception {
        mockMvc.perform(get("/api/answers/" + answerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(answerId));
    }

    // READ 전체
    @Test
    void 답변_전체조회_성공() throws Exception {
        mockMvc.perform(get("/api/answers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].memberId").value(memberId));
    }

    // UPDATE
    @Test
    void 답변_수정_성공() throws Exception {

        AnswerUpdateRequestDTO dto = new AnswerUpdateRequestDTO();
        dto.setAnswerText("수정된 답변 내용");
        dto.setScore(95);
        dto.setComment("수정 코멘트");

        mockMvc.perform(put("/api/answers/" + answerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("수정된 답변 내용"))
                .andExpect(jsonPath("$.score").value(95));
    }

    // DELETE
    @Test
    void 답변_삭제_성공() throws Exception {

        mockMvc.perform(delete("/api/answers/" + answerId))
                .andExpect(status().isOk());

        // 삭제 후 조회하면 400 or 404 → 예외 처리됨
        mockMvc.perform(get("/api/answers/" + answerId))
                .andExpect(status().isBadRequest());
    }
}
