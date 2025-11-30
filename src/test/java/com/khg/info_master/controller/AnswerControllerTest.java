package com.khg.info_master.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AnswerControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    QuestionRepository questionRepository;
    
    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    ObjectMapper objectMapper;

    Long memberId;
    Long questionId;

    // 테스트 후에는 DB 초기화
    @BeforeEach
    void clean() {
        answerRepository.deleteAll();
        questionRepository.deleteAll();
        memberRepository.deleteAll();
    }


    @BeforeEach
    void setup() {
        // 1. Member 저장
        Member member = Member.builder()
                .email("test1@test.com")
                .password("123456")
                .name("tester")
                .build();

        Member savedMember = memberRepository.save(member);
        memberId = savedMember.getId();

        // 2. Question 저장
        Question q = Question.builder()
                .year(2025)
                .round(1)
                .subject("보안")
                .number(3)
                .questionText("다음 중 SQL Injection을 방지하기 위한 방법은?")
                .difficulty("중")
                .build();

        Question savedQuestion = questionRepository.save(q);
        questionId = savedQuestion.getId();
    }

    @Test
    void 답변_생성_성공() throws Exception {

        // Answer 생성 DTO
        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setMemberId(memberId);
        dto.setQuestionId(questionId);
        dto.setAnswerText("정규화는 이상현상을 제거하고 데이터 중복을 최소화하는 과정입니다.");
        dto.setScore(80);
        dto.setComment("전반적으로 잘 설명했음");

        mockMvc.perform(post("/api/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(memberId))
                .andExpect(jsonPath("$.questionId").value(questionId))
                .andExpect(jsonPath("$.answerText").value(dto.getAnswerText()));
    }

}
