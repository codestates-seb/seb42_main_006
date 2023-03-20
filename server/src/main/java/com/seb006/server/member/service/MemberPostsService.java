package com.seb006.server.member.service;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.utils.CustomPagination;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

        List<PrfPost> prfPosts = findMember.getPrfPosts().stream()
                .sorted(Comparator.comparing(PrfPost::getId).reversed())
                .collect(Collectors.toList());

        Page<PrfPost> prfPostLikePage
                = new CustomPagination<PrfPost>().pagination(prfPosts, page, size);

        return prfPostLikePage;
    }

    public Page<RecruitPost> findMyRecruitPosts(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);

        List<RecruitPost> recruitPosts = findMember.getRecruitPosts().stream()
                .sorted(Comparator.comparing(RecruitPost::getId).reversed())
                .collect(Collectors.toList());

        Page<RecruitPost> recruitPostPage
                = new CustomPagination<RecruitPost>().pagination(recruitPosts, page, size);

        return recruitPostPage;
    }

    public Page<PrfPostLike> findMyPrfPostsLike(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);

        List<PrfPostLike> prfPostLikes = findMember.getPrfPostLikes().stream()
                .sorted(Comparator.comparing(PrfPostLike::getId).reversed())
                .collect(Collectors.toList());

        Page<PrfPostLike> prfPostLikePage
                = new CustomPagination<PrfPostLike>().pagination(prfPostLikes, page, size);

        return prfPostLikePage;
    }

    public Page<Participation> findMyParticipation(String email, int page, int size) {
        Member findMember = memberService.findVerifiedMember(email);

        List<Participation> participationList =findMember.getParticipationList().stream()
                .sorted(Comparator.comparing(Participation::getId).reversed())
                .collect(Collectors.toList());

        Page<Participation> participationPage
                = new CustomPagination<Participation>().pagination(participationList, page, size);

        return participationPage;
    }

}
