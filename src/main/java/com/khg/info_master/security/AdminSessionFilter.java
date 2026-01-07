package com.khg.info_master.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

public class AdminSessionFilter extends OncePerRequestFilter {

    // 관리자 권한이 필요한 HTTP 메서드
    private static final Set<String> ADMIN_METHODS =
            Set.of("POST", "PUT", "DELETE");

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();
        String method = request.getMethod();

        // 관리자 인증 API는 통과
        if (uri.startsWith("/admin")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 문제 API 중 쓰기 요청만 관리자 필요
        if (uri.startsWith("/api/questions")
                && ADMIN_METHODS.contains(method)) {

            HttpSession session = request.getSession(false);

            if (session == null || session.getAttribute("ADMIN") != Boolean.TRUE) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
