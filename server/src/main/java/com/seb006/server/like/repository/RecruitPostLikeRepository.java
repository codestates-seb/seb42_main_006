package com.seb006.server.like.repository;

import com.seb006.server.recruitpost.entity.RecruitPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitPostLikeRepository extends JpaRepository<RecruitPost, Long> {
}
