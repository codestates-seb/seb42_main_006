package com.seb006.server.member.controller;

import com.seb006.server.global.response.MultiResponseDto;
import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.dto.MemberPostsDto;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.mapper.MemberMapper;
import com.seb006.server.member.service.MemberPostsService;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberPostsService memberPostsService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService,
                            MemberPostsService memberPostsService,
                            MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberPostsService = memberPostsService;
        this.memberMapper = memberMapper;
    }

    @PostMapping("/sign-up")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member createMember = memberService.createMember(memberMapper.memberPostToMember(requestBody));
        MemberDto.Response response = memberMapper.memberToResponseDto(createMember);

        // TODO: location 추가

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PostMapping("/email-check")
    public ResponseEntity validateEmail(@Valid @RequestBody MemberDto.Email email) {
        memberService.checkExistEmail(email.getEmail());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal Member member) {
        memberService.deleteMember(member);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mypage")
    public ResponseEntity getMember(@AuthenticationPrincipal Member member) {
        Member findMember = memberService.findMember(member);
        MemberDto.Response response = memberMapper.memberToResponseDto(findMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/nickname")
    public ResponseEntity patchNickName(@Valid @RequestBody MemberDto.Patch requestBody,
                                        @AuthenticationPrincipal Member member) {
        requestBody.setId(member.getId());

        Member updateMember = memberService.updateMember(memberMapper.memberPatchToMember(requestBody));
        MemberDto.Response response = memberMapper.memberToResponseDto(updateMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/password")
    public ResponseEntity patchPassword(@Valid @RequestBody MemberDto.Patch requestBody,
                                        @AuthenticationPrincipal Member member) {
        requestBody.setId(member.getId());

        Member updateMember = memberService.updateMember(memberMapper.memberPatchToMember(requestBody));
        MemberDto.Response response = memberMapper.memberToResponseDto(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/prf-posts")
    public ResponseEntity getMyPrfPosts(@AuthenticationPrincipal Member member,
                                        @Positive @RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "10") int size) {
        Page<PrfPost> prfPostPage
                = memberPostsService.findMyPrfPosts(member, page - 1, size);
        List<PrfPost> prfPosts =  prfPostPage.getContent();
        List<MemberPostsDto> response = memberMapper.prfPostsToMemberPostsDtos(prfPosts);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, prfPostPage), HttpStatus.OK);
    }

    @GetMapping("/recruit-posts")
    public ResponseEntity getMyRecruitPosts(@AuthenticationPrincipal Member member,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "10") int size) {
        Page<RecruitPost> recruitPostPage
                = memberPostsService.findMyRecruitPosts(member, page - 1, size);
        List<RecruitPost> recruitPosts = recruitPostPage.getContent();
        List<MemberPostsDto> response = memberMapper.recruitPostsToMemberPostsDtos(recruitPosts);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, recruitPostPage), HttpStatus.OK);
    }

    @GetMapping("/prf-posts-like")
    public ResponseEntity getMyPrfPostsLike(@AuthenticationPrincipal Member member,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "10") int size) {
        Page<PrfPostLike> prfPostLikePage
                = memberPostsService.findMyPrfPostsLike(member, page - 1, size);
        List<PrfPostLike> prfPostLikes = prfPostLikePage.getContent();
        List<MemberPostsDto> response = memberMapper.prfPostsLikeToMemberPostDtos(prfPostLikes);

        return new ResponseEntity(
                new MultiResponseDto<>(response, prfPostLikePage), HttpStatus.OK);
    }

    @GetMapping("/participation")
    public ResponseEntity getMyParticipation(@AuthenticationPrincipal Member member,
                                             @Positive @RequestParam(defaultValue = "1") int page,
                                             @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Participation> participationPage
                = memberPostsService.findMyParticipation(member, page - 1, size);
        List<Participation> participationList  = participationPage.getContent();
        List<MemberPostsDto> response = memberMapper.participationToMemberPostDtos(participationList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, participationPage), HttpStatus.OK
        );

    }
}
