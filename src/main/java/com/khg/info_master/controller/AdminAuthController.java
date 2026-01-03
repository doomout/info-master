package com.khg.info_master.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.khg.info_master.domain.Admin;
import com.khg.info_master.dto.admin.AdminLoginRequest;
import com.khg.info_master.service.AdminAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest req) {
        Admin admin = authService.login(req.getUsername(), req.getPassword());
        return ResponseEntity.ok().build();
    }
}
