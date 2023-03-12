package com.seb006.server.member.controller;

import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.mapper.MemberMapper;
import com.seb006.server.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @PostMapping("/sign-up")
    public ResponseEntity postMember(@RequestBody MemberDto.Post requestBody) {
        Member createMember = memberService.createMember(memberMapper.memberPostToMember(requestBody));
        MemberDto.Response response = memberMapper.memberToResponseDto(createMember);

        // TODO: location 추가

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PostMapping("/email-check")
    public ResponseEntity validateEmail(@RequestBody MemberDto.Email email) {
        log.info(email.getEmail());
        memberService.checkExistEmail(email.getEmail());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
