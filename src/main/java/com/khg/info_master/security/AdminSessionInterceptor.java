package com.khg.info_master.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static com.khg.info_master.controller.AdminAuthController.SESSION_KEY;

@Component
public class AdminSessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
        String uri = req.getRequestURI();

        // 로그인/로그아웃/me 는 통과(원하면 me는 보호해도 됨)
        if (uri.equals("/admin/login") || uri.equals("/admin/logout")) return true;

        HttpSession session = req.getSession(false);
        Object v = (session == null) ? null : session.getAttribute(SESSION_KEY);

        if (!(v instanceof Boolean) || !((Boolean) v)) {
            res.setStatus(401);
            return false;
        }
        return true;
    }
}
