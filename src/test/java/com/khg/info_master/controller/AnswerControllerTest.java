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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false) // Security 필터 제거
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
    void setup() throws Exception {

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
                .exam_year(2024)
                .round(1)
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

        String response = mockMvc.perform(post("/api/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("정답입니다."))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Map<String, Object> map = objectMapper.readValue(response, Map.class);
        answerId = Long.valueOf(map.get("id").toString());
    }

    // CREATE → 실제는 UPDATE
    @Test
    void 답변_생성_또는_업데이트_성공() throws Exception {

        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setMemberId(memberId);
        dto.setQuestionId(questionId);
        dto.setAnswerText("새로운 내용으로 수정됨");

        mockMvc.perform(post("/api/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(answerId)) // 기존 답변 업데이트됨
                .andExpect(jsonPath("$.answerText").value("새로운 내용으로 수정됨"));
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
                .andExpect(jsonPath("$[0].id").value(answerId));
    }

    // READ by Question
    @Test
    void 질문별_답변조회_성공() throws Exception {
        mockMvc.perform(get("/api/answers/question/" + questionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(answerId));
    }

    // UPDATE
    @Test
    void 답변_수정_성공() throws Exception {

        AnswerUpdateRequestDTO dto = new AnswerUpdateRequestDTO();
        dto.setAnswerText("업데이트된 답변");
        dto.setScore(100);
        dto.setComment("코멘트");

        mockMvc.perform(put("/api/answers/" + answerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("업데이트된 답변"))
                .andExpect(jsonPath("$.score").value(100));
    }

    // DELETE
    @Test
    void 답변_삭제_성공() throws Exception {

        mockMvc.perform(delete("/api/answers/" + answerId))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/answers/" + answerId))
                .andExpect(status().isBadRequest());
    }
}

