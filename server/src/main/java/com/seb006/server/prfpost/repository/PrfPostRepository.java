package com.seb006.server.prfpost.repository;

import com.seb006.server.prfpost.entity.PrfPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrfPostRepository extends JpaRepository<PrfPost, Long> {
    // 전체 리스트 가져오기
    Page<PrfPost> findAll(Pageable pageable);

    // 키워드 검색 (태그/제목)
    Page<PrfPost> findByTagsContainingOrTitleContaining(Pageable pageable, String keyword1, String keyword2);

    // 카테고리 + 키워드 검색
    @Query("select p from PrfPost p where p.category=:category and (p.tags like %:keyword% or p.title like %:keyword%)")
    Page<PrfPost> findByCategoryAndKeyword(Pageable pageable, String category, String keyword);

}
