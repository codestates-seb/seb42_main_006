package com.seb006.server.prfpostcomment.repository;

import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrfPostCommentRepository extends JpaRepository<PrfPostComment,Long> {
    List<PrfPostComment> findAllByPrfPost(Sort id, PrfPost prfPost);
}
