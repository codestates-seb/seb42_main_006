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
import java.util.Objects;

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

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), prfPosts.size());

        Page<PrfPost> prfPostPage =
                new PageImpl<>(prfPosts.subList(start, end), pageable, prfPosts.size());

        return prfPostPage;
    }

    public Page<RecruitPost> findMyRecruitPosts(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);
        List<RecruitPost> recruitPosts = findMember.getRecruitPosts();

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recruitPosts.size());

        Page<RecruitPost> recruitPostPage =
                new PageImpl<>(recruitPosts.subList(start, end), pageable, recruitPosts.size());

        return recruitPostPage;
    }

    public Page<PrfPostLike> findMyPrfPostsLike(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);
        List<PrfPostLike> prfPostLikes = findMember.getPrfPostLikes();

        Page<PrfPostLike> prfPostLikePage = new CustomPagination<PrfPostLike>().pagination(prfPostLikes, page, size);

        return prfPostLikePage;
    }

}
