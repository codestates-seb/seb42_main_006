package com.seb006.server.recruitpostcomment.service;

import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.service.RecruitPostService;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import com.seb006.server.recruitpostcomment.repository.RecruitPostCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecruitPostCommentService {

    private final RecruitPostCommentRepository recruitPostCommentRepository;

    private final RecruitPostService recruitPostService;

    private final MemberService memberService;

    public RecruitPostCommentService(RecruitPostCommentRepository recruitPostCommentRepository,
                                     RecruitPostService recruitPostService,
                                     MemberService memberService) {
        this.recruitPostCommentRepository = recruitPostCommentRepository;
        this.recruitPostService = recruitPostService;
        this.memberService = memberService;
    }

    public RecruitPostComment createRecruitPostComment(Member member, RecruitPostComment recruitPostComment){

        RecruitPost recruitPost = recruitPostService.findVerifiedRecruitPost(recruitPostComment.getRecruitPost().getId());

        recruitPostComment.setRecruitPost(recruitPost);
        recruitPostComment.setMember(member);

        return recruitPostCommentRepository.save(recruitPostComment);
    }

    public RecruitPostComment updateRecruitPostComment (RecruitPostComment recruitPostComment){
        RecruitPostComment findRecruitPostComment = findVerifiedRecruitPostComment(recruitPostComment.getId());

        Optional.ofNullable(recruitPostComment.getContent())
                .ifPresent(content -> findRecruitPostComment.setContent(content));

        return recruitPostCommentRepository.save(findRecruitPostComment);
    }

    public RecruitPostComment findRecruitPostComment(long id){
        return findVerifiedRecruitPostComment(id);
    }

    public List<RecruitPostComment> findRecruitPostComments(long recruitPostId){

        RecruitPost recruitPost = recruitPostService.findVerifiedRecruitPost(recruitPostId);

        return recruitPostCommentRepository.findAllByRecruitPost(recruitPost);
    }

    public void deleteRecruitPostComment(long id){
        RecruitPostComment findRecruitPostComment = findVerifiedRecruitPostComment(id);
        recruitPostCommentRepository.deleteById(id);
    }


    public RecruitPostComment findVerifiedRecruitPostComment(Long id){
        Optional<RecruitPostComment> optionalRecruitPostComment =
                recruitPostCommentRepository.findById(id);
        RecruitPostComment findRecruitPostComment =
                optionalRecruitPostComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.RECRUITPOSTCOMMENT_NOT_FOUND));
        return findRecruitPostComment;
    }
}
