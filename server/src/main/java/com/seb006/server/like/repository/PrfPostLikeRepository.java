package com.seb006.server.like.repository;

import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrfPostLikeRepository extends JpaRepository<PrfPost, Long> {
}
