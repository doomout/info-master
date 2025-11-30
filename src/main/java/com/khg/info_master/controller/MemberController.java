package com.khg.info_master.controller;

import com.khg.info_master.domain.Member;
import com.khg.info_master.dto.member.MemberResponseDTO;
import com.khg.info_master.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{id}")
    public MemberResponseDTO get(@PathVariable Long id) {
        Member member = memberService.get(id);
        return memberService.toDTO(member);
    }

    @GetMapping
    public List<MemberResponseDTO> getAll() {
        return memberService.getAll().stream()
                .map(memberService::toDTO)
                .toList();
    }

    @PostMapping
    public MemberResponseDTO create(@RequestBody Member member) {
        Member saved = memberService.create(member);
        return memberService.toDTO(saved);
    }

    @PutMapping("/{id}")
    public MemberResponseDTO update(@PathVariable Long id, @RequestBody Member member) {
        Member updated = memberService.update(id, member);
        return memberService.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        memberService.delete(id);
    }
}
