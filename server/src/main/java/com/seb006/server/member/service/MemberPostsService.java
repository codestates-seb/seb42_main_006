package com.seb006.server.member.service;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.utils.CustomPagination;
import org.springframework.data.domain.*;
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

    public Page<PrfPost> findMyPrfPosts(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);
        List<PrfPost> prfPosts = findMember.getPrfPosts();

        Page<PrfPost> prfPostLikePage
                = new CustomPagination<PrfPost>().pagination(prfPosts, page, size);

        return prfPostLikePage;
    }

    public Page<RecruitPost> findMyRecruitPosts(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);
        List<RecruitPost> recruitPosts = findMember.getRecruitPosts();

        Page<RecruitPost> recruitPostPage
                = new CustomPagination<RecruitPost>().pagination(recruitPosts, page, size);

        return recruitPostPage;
    }

    public Page<PrfPostLike> findMyPrfPostsLike(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);
        List<PrfPostLike> prfPostLikes = findMember.getPrfPostLikes();

        Page<PrfPostLike> prfPostLikePage
                = new CustomPagination<PrfPostLike>().pagination(prfPostLikes, page, size);

        return prfPostLikePage;
    }

}
