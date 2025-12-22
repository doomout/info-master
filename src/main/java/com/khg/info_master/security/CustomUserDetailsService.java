package com.khg.info_master.security;

import com.khg.info_master.domain.Member;
import com.khg.info_master.repository.MemberRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

// userId 로 사용자 조회
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) {
        Member member = memberRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new UserPrincipal(member);
    }
}
