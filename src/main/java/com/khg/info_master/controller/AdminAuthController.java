package com.khg.info_master.controller;

import com.khg.info_master.dto.admin.AdminLoginRequest;
import com.khg.info_master.security.jwt.JwtTokenProvider;
import com.khg.info_master.service.AdminAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    // 🔐 로그인 → JWT 발급
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest req) {
        authService.login(req.getUsername(), req.getPassword());

        String token = jwtTokenProvider.createToken(req.getUsername());

        return ResponseEntity.ok(
            Map.of("accessToken", token)
        );
    }

    // 👤 로그인 상태 확인 (JWT 기준)
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(
            Map.of("username", authentication.getName())
        );
    }

    // 🚪 로그아웃 (JWT에서는 서버 처리 없음)
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
}
