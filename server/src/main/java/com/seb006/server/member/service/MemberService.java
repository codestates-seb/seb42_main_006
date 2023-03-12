package com.seb006.server.member.service;

import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        checkExistEmail(member.getEmail());

        return memberRepository.save(member);
    }

    public void checkExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent())
            throw new RuntimeException("MEMBER_EXISTS");
    }
}
