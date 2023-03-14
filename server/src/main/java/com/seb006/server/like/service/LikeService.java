package com.seb006.server.like.service;

import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.like.entity.RecruitPostLike;
import com.seb006.server.like.repository.PrfPostLikeRepository;
import com.seb006.server.like.repository.RecruitPostLikeRepository;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.springframework.stereotype.Service;



@Service
public class LikeService {
    private final PrfPostLikeRepository prfPostLikeRepository;
    private final RecruitPostLikeRepository recruitPostLikeRepository;

    public LikeService(PrfPostLikeRepository prfPostLikeRepository, RecruitPostLikeRepository recruitPostLikeRepository) {
        this.prfPostLikeRepository = prfPostLikeRepository;
        this.recruitPostLikeRepository = recruitPostLikeRepository;
    }

    // 게시글 좋아요
    public PrfPostLike addPrfPostLike(Member member, PrfPost prfPost){
        PrfPostLike prfPostLike = new PrfPostLike(member, prfPost);
        prfPost.likeCountUp();

        return prfPostLikeRepository.save(prfPostLike);
    }

    // 모집글 좋아요
    public RecruitPostLike addRecruitPostLike(Member member, RecruitPost recruitPost){
        //RecruitPostLike recruitPostLike = new RecruitPostLike(member, recruitPost);
        // TODO: count++

        //return recruitPostLikeRepository.save(recruitPostLike);
        return null;
    }

    // 게시글 좋아요 취소
    public void cancelPrfPostLike(Member member, PrfPost prfPost){
        PrfPostLike prfPostLike = prfPostLikeRepository.findByMemberAndPrfPost(member, prfPost)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRFPOSTLIKE_NOT_FOUND));

        prfPostLikeRepository.delete(prfPostLike);
        prfPost.likeCountDown();
    }

    // 모집글 좋아요 취소
    public void cancelRecruitPostLike(Member member, RecruitPost recruitPost){
        // TODO: count--
    }

}
