package com.khg.info_master.security;

import com.khg.info_master.domain.Member; // ⚠️ 실제 Member 패키지로 수정
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.List;

public class WithMockUserPrincipalSecurityContextFactory
        implements WithSecurityContextFactory<WithMockUserPrincipal> {

    @Override
    public SecurityContext createSecurityContext(WithMockUserPrincipal annotation) {

        // ✅ 테스트용 Member 생성 (DB 저장까지는 안 함)
        Member member = new Member();
        member.setId(annotation.id());          // id setter 필요
        member.setEmail(annotation.email());
        member.setPassword("pw");               // 필요하면
        member.setName("테스터");               // 필요하면

        UserPrincipal principal = new UserPrincipal(member);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        principal,
                        null,
                        List.of()
                );

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        return context;
    }
}
