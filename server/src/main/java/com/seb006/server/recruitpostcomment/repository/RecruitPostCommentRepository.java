package com.seb006.server.recruitpostcomment.repository;

import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecruitPostCommentRepository extends JpaRepository<RecruitPostComment,Long> {
    List<RecruitPostComment> findAllByRecruitPost(RecruitPost recruitPost);
}
