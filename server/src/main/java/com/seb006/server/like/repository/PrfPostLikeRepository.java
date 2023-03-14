package com.seb006.server.like.repository;

import com.seb006.server.like.entity.PrfPostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrfPostLikeRepository extends JpaRepository<PrfPostLike, Long> {
}
