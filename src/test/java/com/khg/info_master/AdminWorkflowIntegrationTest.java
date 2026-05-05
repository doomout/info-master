package com.khg.info_master;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khg.info_master.domain.Admin;
import com.khg.info_master.repository.AdminRepository;
import com.khg.info_master.repository.AnswerRepository;
import com.khg.info_master.repository.QuestionRepository;
import com.khg.info_master.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
class AdminWorkflowIntegrationTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private TagRepository tagRepository;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        answerRepository.deleteAll();
        questionRepository.deleteAll();
        tagRepository.deleteAll();
        adminRepository.deleteAll();

        adminRepository.save(Admin.builder()
                .username("admin")
                .password(passwordEncoder.encode("password"))
                .build());
    }

    @Test
    void adminCanManageTagQuestionAnswerAndCascadeDelete() throws Exception {
        String loginPayload = objectMapper.writeValueAsString(Map.of(
                "username", "admin",
                "password", "password"
        ));

        String loginResponse = mockMvc.perform(post("/api/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginPayload))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String token = objectMapper.readTree(loginResponse).get("accessToken").asText();
        String authHeader = "Bearer " + token;

        String tagPayload = objectMapper.writeValueAsString(Map.of("name", "java"));
        mockMvc.perform(post("/api/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagPayload))
                .andExpect(status().isUnauthorized());

        String tagResponse = mockMvc.perform(post("/api/tags")
                        .header("Authorization", authHeader)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("java"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long tagId = objectMapper.readTree(tagResponse).get("id").asLong();

        String questionPayload = objectMapper.writeValueAsString(Map.of(
                "examYear", 2026,
                "round", 1,
                "number", 1,
                "questionText", "Example question",
                "tagId", tagId,
                "difficulty", "easy"
        ));

        String questionResponse = mockMvc.perform(post("/api/questions")
                        .header("Authorization", authHeader)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(questionPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionText").value("Example question"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long questionId = objectMapper.readTree(questionResponse).get("id").asLong();

        String answerPayload = objectMapper.writeValueAsString(Map.of("answerText", "Example answer"));
        mockMvc.perform(put("/api/questions/" + questionId + "/answer")
                        .header("Authorization", authHeader)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(answerPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answerText").value("Example answer"));

        String updatePayload = objectMapper.writeValueAsString(Map.of(
                "examYear", 2026,
                "round", 2,
                "number", 99,
                "questionText", "Updated question",
                "difficulty", "hard"
        ));

        mockMvc.perform(put("/api/questions/" + questionId)
                        .header("Authorization", authHeader)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionText").value("Updated question"));

        mockMvc.perform(delete("/api/questions/" + questionId)
                        .header("Authorization", authHeader))
                .andExpect(status().isOk());

        assertThat(questionRepository.findById(questionId)).isEmpty();
        assertThat(answerRepository.findByQuestionId(questionId)).isEmpty();
    }
}
