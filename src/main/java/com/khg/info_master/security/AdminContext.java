package com.khg.info_master.security;

public class AdminContext {
    // 임시 관리자용 id 생성
    public static final Long ADMIN_ID = 1L;

    public static Long getAdminId() {
        return ADMIN_ID;
    }
}
