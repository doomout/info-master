package com.khg.info_master.controller;

import com.khg.info_master.domain.Member;
import com.khg.info_master.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public Member create(@RequestBody Member member) {
        return memberService.create(member);
    }

    @GetMapping("/{id}")
    public Member get(@PathVariable Long id) {
        return memberService.get(id);
    }

    @GetMapping
    public List<Member> getAll() {
        return memberService.getAll();
    }

    @PutMapping("/{id}")
    public Member update(@PathVariable Long id, @RequestBody Member updateMember) {
        return memberService.update(id, updateMember);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        memberService.delete(id);
        return "deleted";
    }
}
