package com.seb006.server.member.service;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class MemberPostsService {
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public MemberPostsService(MemberRepository memberRepository, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    public List<PrfPost> findMyPrfPosts(String email) {
        Member findMember = memberService.findVerifiedMember(email);

        return findMember.getPrfPosts();
    }

    public List<RecruitPost> findMyRecruitPosts(String email) {
        Member findMember = memberService.findVerifiedMember(email);

        return findMember.getRecruitPosts();
    }

    public List<PrfPostLike> findMyPrfPostsLike(String email) {
        Member findMember = memberService.findVerifiedMember(email);

        return findMember.getPrfPostLikes();
    }

}
