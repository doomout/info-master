package com.khg.info_master.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import jakarta.servlet.http.HttpServletResponse;

import com.khg.info_master.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. CSRF 비활성 (JWT는 쿠키 안 씀)
            .csrf(csrf -> csrf.disable()) 
            
            // 2. CORS 설정
            .cors(cors -> {}) 

            // 3. 세션 완전 비활성
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)  
            )

            // 4인가 규칙
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/login").permitAll() // 로그인만 허용
                .requestMatchers(HttpMethod.GET, "/api/questions/**", "/api/tags/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/questions/**", "/api/tags/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/questions/**", "/api/tags/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/questions/**", "/api/tags/**").authenticated()
                .requestMatchers("/api/admin/**").authenticated() // 관리자 API 보호
                .anyRequest().permitAll()
            )
            // 5. 예외 처리
            .exceptionHandling(exception -> exception
                // 인증 안 된 경우 → 401
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                })

                // 권한 없는 경우 → 403
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                })
            )

            // 6. JWT 필터 등록
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            // 6️⃣ 기본 로그인 폼 비활성
            .formLogin(form -> form.disable());

        return http.build();
    }

    // 🌐 CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // 프론트엔드 컨테이너
        config.addAllowedOrigin("http://localhost:5173"); // 개발용
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
