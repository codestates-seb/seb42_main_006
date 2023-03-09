package com.seb006.server.prfPostComment.repository;

import com.seb006.server.prfPostComment.entity.PrfPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrfPostCommentRepository extends JpaRepository<PrfPostComment,Long> {
}
