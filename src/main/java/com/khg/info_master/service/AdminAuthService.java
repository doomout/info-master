package com.khg.info_master.service;

import com.khg.info_master.domain.Admin;
import com.khg.info_master.repository.AdminRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.khg.info_master.exception.AuthenticationException;

@Service
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminAuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username)
            .orElseThrow(() -> new AuthenticationException("관리자 계정 없음"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new AuthenticationException("비밀번호 불일치");
        }

        return admin;
    }
}
