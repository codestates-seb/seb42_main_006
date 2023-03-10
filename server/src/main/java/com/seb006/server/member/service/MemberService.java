package com.seb006.server.member.service;

import com.seb006.server.auth.utils.CustomAuthorityUtils;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository,
                         CustomAuthorityUtils authorityUtils,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(Member member) {
        checkExistEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public void checkExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent())
            throw new RuntimeException("MEMBER_EXISTS");
    }
}
