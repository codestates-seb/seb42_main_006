package com.seb006.server.prfpost.repository;

import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrfPostRepository extends JpaRepository<PrfPost, Long> {
    Page<PrfPost> findAll(Pageable pageable);
    Page<PrfPost> findByCategoryContainingAndTagsContaining(Pageable pageable, String category, String tagName);
}
