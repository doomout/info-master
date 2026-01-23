package com.khg.info_master.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // JWT 생성 및 검증 로직을 담당하는 클래스
    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    /**
     * 실제 필터 로직
     * - 요청마다 실행
     * - JWT 검증 및 인증 처리 수행
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 현재 요청 URI
        String path = request.getRequestURI();

        // ✅ 관리자 로그인 요청은 JWT 검증을 하지 않고 바로 통과
        // (로그인 자체가 토큰을 발급하는 단계이기 때문)
        if (path.equals("/admin/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Authorization 헤더 조회
        String header = request.getHeader("Authorization");

        // Authorization 헤더가 존재하고 "Bearer "로 시작하는 경우만 처리
        if (header != null && header.startsWith("Bearer ")) {

            // "Bearer " 이후의 실제 JWT 토큰 값 추출
            String token = header.substring(7);

            // 토큰 유효성 검사
            if (tokenProvider.validateToken(token)) {

                // 토큰에서 사용자 식별 정보(username) 추출
                String username = tokenProvider.getUsername(token);

                // Spring Security 인증 객체 생성
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,          // 인증된 사용자 정보
                                null,              // 비밀번호는 필요 없음 (JWT 기반)
                                Collections.emptyList() // 권한 정보 (현재는 미사용)
                        );

                // 요청 정보(IP, 세션 등)를 인증 객체에 설정
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // SecurityContext에 인증 정보 저장
                // 이후 컨트롤러/서비스에서 인증된 사용자로 인식됨
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }
}
