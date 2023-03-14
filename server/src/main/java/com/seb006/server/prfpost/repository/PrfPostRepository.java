package com.seb006.server.prfpost.repository;

import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrfPostRepository extends JpaRepository<PrfPost, Long> {
    // 전체 리스트 가져오기
    Page<PrfPost> findAll(Pageable pageable);
    // 태그 검색
    Page<PrfPost> findByTagsContaining(Pageable pageable, String tagName);
    // 카테고리 + 태그 검색
    Page<PrfPost> findByCategoryEqualsAndTagsContaining(Pageable pageable, String category, String tagName);
}
