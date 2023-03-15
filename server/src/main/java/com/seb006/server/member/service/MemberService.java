package com.seb006.server.member.service;

import com.seb006.server.auth.utils.CustomAuthorityUtils;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
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
        checkExistNickName(member.getNickName());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(readOnly = true)
    public Member findMember(String email) {
        Member member = findVerifiedMember(email);
        return member;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getEmail());

        Optional.ofNullable(member.getNickName())
                .ifPresent(nickName -> findMember.setNickName(nickName));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password ->
                        findMember.setPassword(passwordEncoder.encode(password)));

        Member saveMember = memberRepository.save(findMember);

        return saveMember;
    }

    public void deleteMember(String email) {
        Member member = findVerifiedMember(email);

        member.setMemberStatus(Member.MemberStatus.QUIT);
        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public Member checkExistMember(long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        // 전달받은 id를 가진 회원이 존재하지 않는 경우 exception
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        // 조회한 회원이 존재한다면 상태값을 확인해준다
        if (optionalMember.isPresent()) {
            checkMemberStatus(optionalMember.get());
        }

        // 전달받은 email을 가진 회원이 존재하지 않는 경우 exception
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void checkExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
    }

    private void checkExistNickName(String nickName) {
        Optional<Member> optionalMember = memberRepository.findByNickName(nickName);

        if (optionalMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NICKNAME_EXISTS);
    }

    private void checkMemberStatus(Member member) {
        // 탈퇴한 회원이면 exception
        if (member.getMemberStatus() == Member.MemberStatus.QUIT)
            throw new BusinessLogicException(ExceptionCode.MEMBER_QUIT);
    }
}
