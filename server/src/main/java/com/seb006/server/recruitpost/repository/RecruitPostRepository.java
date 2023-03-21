package com.seb006.server.recruitpost.repository;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.hibernate.sql.Select;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface RecruitPostRepository extends JpaRepository<RecruitPost,Long> {
    Page<RecruitPost> findAll(Pageable pageable);
    Page<RecruitPost> findByTagsContainingOrTitleContaining(Pageable pageable, String keyword1, String keyword2);

    @Query("select p from RecruitPost p where p.category=:category and (p.tags like %:keyword% or p.title like %:keyword%)")
    Page<RecruitPost> findByCategoryAndKeyword(Pageable pageable, String category, String keyword);

}

