package com.seb006.server.like.repository;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrfPostLikeRepository extends JpaRepository<PrfPostLike, Long> {
    Optional<PrfPostLike> findByMemberAndPrfPost(Member member, PrfPost prfPost);
}
