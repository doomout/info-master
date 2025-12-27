package com.khg.info_master.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.khg.info_master.domain.Member;
import com.khg.info_master.domain.Question;
import com.khg.info_master.domain.Tag;
import com.khg.info_master.dto.answer.AnswerCreateRequestDTO;
import com.khg.info_master.repository.MemberRepository;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
class QuestionAnswerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Autowired MemberRepository memberRepository;
    @Autowired QuestionRepository questionRepository;
    @Autowired TagRepository tagRepository;

    Long memberId;
    Long questionId;

    @BeforeEach
    void setup() {

        questionRepository.deleteAll();
        tagRepository.deleteAll();
        memberRepository.deleteAll();

        // 회원
        Member m = new Member();
            m.setEmail("test@test.com");
            m.setPassword("1234");
            m.setName("tester");
        memberId = memberRepository.save(m).getId();

        // 태그
        Tag tag = new Tag();
        tag.setName("보안");
        tagRepository.save(tag);

        // 문제
        Question q = new Question();
            q.setExam_year(2024);
            q.setRound(1);
            q.setNumber(1);
            q.setQuestionText("XSS 방지 방법은?");
            q.setDifficulty("중");
            q.setTag(tag);
            q.setMember(m); 

        questionId = questionRepository.save(q).getId();
    }

    @Test
    void 답안_생성_성공() throws Exception {

        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setAnswerText("정답입니다.");

        mockMvc.perform(put("/api/questions/{id}/answer", questionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("정답입니다."));
    }

    @Test
    void 답안_수정_성공() throws Exception {

        // 1️⃣ 최초 생성
        AnswerCreateRequestDTO first = new AnswerCreateRequestDTO();
        first.setAnswerText("초기 답안");

        mockMvc.perform(put("/api/questions/{id}/answer", questionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(first)))
                .andDo(print())
                .andExpect(status().isOk());

        // 2️⃣ 같은 API로 수정
        AnswerCreateRequestDTO update = new AnswerCreateRequestDTO();
        update.setAnswerText("수정된 답안");

        mockMvc.perform(put("/api/questions/{id}/answer", questionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("수정된 답안"));
    }

    @Test
    void 문제_조회시_답안_포함() throws Exception {

        AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
        dto.setAnswerText("정답입니다.");

        mockMvc.perform(put("/api/questions/{id}/answer", questionId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/questions/{id}", questionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answer.answerText").value("정답입니다."));
    }

    // @Test
    // void 답안_작성_인증없으면_실패() throws Exception {

    //     AnswerCreateRequestDTO dto = new AnswerCreateRequestDTO();
    //     dto.setAnswerText("인증 없음");

    //     mockMvc.perform(put("/api/questions/{id}/answer", questionId)
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(dto)))
    //             .andExpect(status().isUnauthorized());
    // }


}
