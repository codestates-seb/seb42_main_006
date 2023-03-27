package com.seb006.server.participation.repository;

import com.seb006.server.member.entity.Member;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation,Long> {
    Optional<Participation> findByMemberAndRecruitPost(Member member, RecruitPost recruitPost);

}
