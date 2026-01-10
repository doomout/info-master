package com.khg.info_master.controller;

import com.khg.info_master.dto.admin.AdminLoginRequest;
import com.khg.info_master.service.AdminAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    public static final String SESSION_KEY = "ADMIN";

    private final AdminAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody AdminLoginRequest req, HttpSession session) {
        authService.login(req.getUsername(), req.getPassword()); // 맞/틀 판단만
        session.setAttribute(SESSION_KEY, true);                 // ✅ 세션 저장
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Void> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(401).build();
        }

        Object v = session.getAttribute(SESSION_KEY);
        if (!(v instanceof Boolean) || !((Boolean) v)) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok().build();
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        return ResponseEntity.ok().build();
    }
}
