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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class LikeService {
    private final PrfPostLikeRepository prfPostLikeRepository;
    private final RecruitPostLikeRepository recruitPostLikeRepository;

    public LikeService(PrfPostLikeRepository prfPostLikeRepository, RecruitPostLikeRepository recruitPostLikeRepository) {
        this.prfPostLikeRepository = prfPostLikeRepository;
        this.recruitPostLikeRepository = recruitPostLikeRepository;
    }

    // 게시글 좋아요
    @Transactional
    public PrfPostLike addPrfPostLike(Member member, PrfPost prfPost){
        checkExistPrfPostLike(member, prfPost); // 이미 좋아요한 경우

        PrfPostLike prfPostLike = new PrfPostLike(member, prfPost);
        prfPost.likeCountUp();

        return prfPostLikeRepository.save(prfPostLike);
    }

    // 게시글 좋아요 취소
    @Transactional
    public void cancelPrfPostLike(Member member, PrfPost prfPost){
        prfPost.likeCountDown();
        PrfPostLike prfPostLike = prfPostLikeRepository.findByMemberAndPrfPost(member, prfPost)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRFPOSTLIKE_NOT_FOUND));

        prfPostLikeRepository.delete(prfPostLike);
    }

    // 모집글 좋아요
    @Transactional
    public RecruitPostLike addRecruitPostLike(Member member, RecruitPost recruitPost){
        checkExistRecruitPostLike(member, recruitPost); // 이미 좋아요한 경우

        recruitPost.likeCountUp();
        RecruitPostLike recruitPostLike = new RecruitPostLike(member, recruitPost);

        return recruitPostLikeRepository.save(recruitPostLike);
    }

    // 모집글 좋아요 취소
    @Transactional
    public void cancelRecruitPostLike(Member member, RecruitPost recruitPost){
        recruitPost.likeCountDown();

        RecruitPostLike recruitPostLike = recruitPostLikeRepository.findByMemberAndRecruitPost(member, recruitPost)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.RECRUITPOST_NOT_FOUND));
        recruitPostLikeRepository.delete(recruitPostLike);
    }


    // 이미 좋아요한 게시글인지 확인
    public void checkExistPrfPostLike(Member member, PrfPost prfPost){
        if (prfPostLikeRepository.findByMemberAndPrfPost(member, prfPost).isPresent()){
            throw new BusinessLogicException(ExceptionCode.PRFPOSTLIKE_EXISTS);
        }
    }

    // 이미 좋아요한 모잡글인지 확인
    public void checkExistRecruitPostLike(Member member, RecruitPost recruitPost){
        if (recruitPostLikeRepository.findByMemberAndRecruitPost(member, recruitPost).isPresent()){
            throw new BusinessLogicException(ExceptionCode.RECRUITPOSTLIKE_EXISTS);
        }
    }

    // 좋아요한 게시글의 ID 리스트 return
    public List<Long> prfPostLiked(Member member, List<PrfPost> prfPosts){
        return prfPostLikeRepository.findByMemberAndPrfPostIn(member, prfPosts).stream()
                .map(prfPostLike -> prfPostLike.getPrfPost().getId())
                .collect(Collectors.toList());
    }

    // 좋아요한 게시글의 ID 리스트 return
    public List<Long> recruitPostLiked(Member member, List<RecruitPost> recruitPost){
        return recruitPostLikeRepository.findByMemberAndRecruitPostIn(member, recruitPost).stream()
                .map(recruitPostLike -> recruitPostLike.getRecruitPost().getId())
                .collect(Collectors.toList());
    }

    // 좋아요한 게시글이면 return true
    public boolean isPrfPostLiked(Member member, PrfPost prfPost){
        if (prfPostLikeRepository.findByMemberAndPrfPost(member, prfPost).isPresent()){
            return true;
        }
        return false;
    }

    // 좋아요한 모집글이면 return true
    public boolean isRecruitPostLiked(Member member, RecruitPost recruitPost){
        if (recruitPostLikeRepository.findByMemberAndRecruitPost(member, recruitPost).isPresent()){
            return true;
        }
        return false;
    }
}
