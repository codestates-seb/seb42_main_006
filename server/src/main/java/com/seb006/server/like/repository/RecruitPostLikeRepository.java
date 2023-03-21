package com.seb006.server.like.repository;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.like.entity.RecruitPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecruitPostLikeRepository extends JpaRepository<RecruitPostLike, Long> {
    Optional<RecruitPostLike> findByMemberAndRecruitPost(Member member, RecruitPost recruitPost);
    List<RecruitPostLike> findByMemberAndRecruitPostIn(Member member, List<RecruitPost> recruitPosts);
}
