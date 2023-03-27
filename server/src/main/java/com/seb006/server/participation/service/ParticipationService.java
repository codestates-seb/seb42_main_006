package com.seb006.server.participation.service;

import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.participation.repository.ParticipationRepository;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.service.RecruitPostService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParticipationService {

    private final RecruitPostService recruitPostService;
    private final ParticipationRepository participationRepository;


    public ParticipationService(RecruitPostService recruitPostService, ParticipationRepository participationRepository) {
        this.recruitPostService = recruitPostService;
        this.participationRepository = participationRepository;
    }

    //모집글 참여
    public Participation addParticipation(Member member, RecruitPost recruitPost) {
        existParticipation(member, recruitPost);

        Participation participation = new Participation(member, recruitPost);
        recruitPost.currentNumberUp();
        range(recruitPost.getId(), recruitPost);

        return participationRepository.save(participation);
    }

    //모집글 참여취소
    public void cancelParticipation(Member member, RecruitPost recruitPost) {
        recruitPost.currentNumberDown();

        Participation participation = participationRepository.findByMemberAndRecruitPost(member, recruitPost)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PARTICIPATION_NOT_FOUND));
        participationRepository.delete(participation);
    }

    public void existParticipation(Member member, RecruitPost recruitPost) {
        if (participationRepository.findByMemberAndRecruitPost(member, recruitPost).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PARTICIPATIOM_EXISTS);
        }
    }

    public void range (long id,RecruitPost recruitPost) {
        RecruitPost findRecruitPost = recruitPostService.findVerifiedRecruitPost(id);

        if (recruitPost.getRecruitNumber() < recruitPost.getCurrentNumber()) {
            throw new BusinessLogicException(ExceptionCode.PARTICIPATION_FULL);
        }
    }
}
