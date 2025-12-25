package com.khg.info_master.service;

import com.khg.info_master.domain.Member;
import com.khg.info_master.dto.member.MemberResponseDTO;
import com.khg.info_master.dto.member.MemberUpdateRequestDTO;
import com.khg.info_master.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member create(Member member) {
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        return memberRepository.save(member);
    }

    public Member get(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    public List<Member> getAll() {
        return memberRepository.findAll();
    }

    // DTO를 활용한 회원 정보 수정
    public MemberResponseDTO update(Long id, MemberUpdateRequestDTO dto) {
        Member member = get(id);
        if (dto.getEmail() != null) {
            member.setEmail(dto.getEmail());
        }
        member.setName(dto.getName());
        member.setPassword(dto.getPassword());
        Member saved = memberRepository.save(member);

        return toDTO(saved);
    }

    public void delete(Long id) {
        memberRepository.deleteById(id);
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }

    // DTO 변환 메서드
    public MemberResponseDTO toDTO(Member member) {
        return MemberResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .createdAt(member.getCreatedAt())
                .build();
    }

}
