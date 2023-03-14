package com.seb006.server.like.service;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.like.repository.PrfPostLikeRepository;
import com.seb006.server.like.repository.RecruitPostLikeRepository;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.stereotype.Service;

@Service
public class LikeService {
    private final PrfPostLikeRepository prfPostLikeRepository;
    private final RecruitPostLikeRepository recruitPostLikeRepository;

    public LikeService(PrfPostLikeRepository prfPostLikeRepository, RecruitPostLikeRepository recruitPostLikeRepository) {
        this.prfPostLikeRepository = prfPostLikeRepository;
        this.recruitPostLikeRepository = recruitPostLikeRepository;
    }

    public PrfPostLike addPrfPostLike(Member member, PrfPost prfPost){
        PrfPostLike prfPostLike = new PrfPostLike(member, prfPost);

        return prfPostLikeRepository.save(prfPostLike);
    }
}
