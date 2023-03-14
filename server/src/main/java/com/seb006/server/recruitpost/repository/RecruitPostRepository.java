package com.seb006.server.recruitpost.repository;

import com.seb006.server.recruitpost.entity.RecruitPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecruitPostRepository extends JpaRepository<RecruitPost,Long> {

    Optional<List<RecruitPost>> findByTagsContainingOrTitleContaining(String keyword);

    Optional<List<RecruitPost>> findByCategoryContaining(String keyword);
}
