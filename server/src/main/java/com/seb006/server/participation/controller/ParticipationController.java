package com.seb006.server.participation.controller;

import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.participation.dto.ParticipationDto;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.participation.mapper.ParticipationMapper;
import com.seb006.server.participation.service.ParticipationService;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.service.RecruitPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/recruit-posts")
public class ParticipationController {

    private final MemberService memberService;

    private final ParticipationService participationService;

    private final RecruitPostService recruitPostService;

    private final ParticipationMapper mapper;

    public ParticipationController(MemberService memberService,
                                   ParticipationService participationService,
                                   RecruitPostService recruitPostService,
                                   ParticipationMapper mapper) {
        this.memberService = memberService;
        this.participationService = participationService;
        this.recruitPostService = recruitPostService;
        this.mapper = mapper;
    }

    @PostMapping("/{recruit-post-id}/participation")
    public ResponseEntity postParticipation(@AuthenticationPrincipal Member member,
                                            @PathVariable("recruit-post-id")long recruitPostId){

        RecruitPost recruitPost = recruitPostService.findVerifiedRecruitPost(recruitPostId);

        Participation participation = participationService.addParticipation(member,recruitPost);

        return new ResponseEntity<>(mapper.participationToParticipationResponseDto(recruitPost,participation),HttpStatus.OK);
    }

    @DeleteMapping("/{recruit-post-id}/cancel")
    public ResponseEntity deleteParticipation(@AuthenticationPrincipal Member member,
                                              @PathVariable("recruit-post-id")long recruitPostId){
        RecruitPost recruitPost = recruitPostService.findVerifiedRecruitPost(recruitPostId);

        participationService.cancelParticipation(member, recruitPost);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{recruit-post-id}/checkParticipation")
    public ResponseEntity getParticipations(@AuthenticationPrincipal Member member,
                                            @PathVariable("recruit-post-id")long recruitPostId){

        RecruitPost recruitPost = recruitPostService.findVerifiedRecruitPost(recruitPostId);

        boolean result = participationService.isParticipation(member,recruitPost);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
