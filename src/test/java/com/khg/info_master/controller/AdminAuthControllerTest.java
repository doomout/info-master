package com.khg.info_master.controller;

import com.khg.info_master.service.AdminAuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminAuthController.class)
@AutoConfigureMockMvc(addFilters = false) // ✅ Security 끔 (관리자 인증은 세션 플래그로만)
class AdminAuthControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @MockBean AdminAuthService adminAuthService;

    @Test
    void 로그인_성공하면_세션에_ADMIN이_저장되고_me가_200() throws Exception {
        willDoNothing().given(adminAuthService).login(anyString(), anyString());

        // 1) login -> 세션을 받아오자
        var loginResult = mockMvc.perform(post("/admin/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username":"admin","password":"1234"}
                """))
            .andExpect(status().isOk())
            .andReturn();

        MockHttpSession session = (MockHttpSession) loginResult.getRequest().getSession(false);

        // 2) me -> 같은 세션으로 호출
        mockMvc.perform(get("/admin/me").session(session))
            .andExpect(status().isOk());
    }

    @Test
    void 로그인_실패하면_400() throws Exception {
        willThrow(new IllegalArgumentException("비밀번호 불일치"))
                .given(adminAuthService).login(anyString(), anyString());

        mockMvc.perform(post("/admin/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username":"admin","password":"wrong"}
                """))
            .andExpect(status().isBadRequest());
    }

    @Test
    void 로그아웃하면_me가_401() throws Exception {
        willDoNothing().given(adminAuthService).login(anyString(), anyString());

        // login
        var loginResult = mockMvc.perform(post("/admin/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username":"admin","password":"1234"}
                """))
            .andExpect(status().isOk())
            .andReturn();

        MockHttpSession session = (MockHttpSession) loginResult.getRequest().getSession(false);

        // logout
        mockMvc.perform(post("/admin/logout").session(session))
            .andExpect(status().isOk());

        // me (세션 invalidate 되었으니 401 기대)
        mockMvc.perform(get("/admin/me").session(session))
            .andExpect(status().isUnauthorized());
    }
}
