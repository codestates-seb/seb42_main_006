package com.seb006.server.recruitpostcomment.controller;

import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentPatchDto;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentPostDto;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentResponseDto;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import com.seb006.server.recruitpostcomment.mapper.RecruitPostCommentMapper;
import com.seb006.server.recruitpostcomment.service.RecruitPostCommentService;
import com.seb006.server.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RequestMapping("/recruit-comments")
@RestController
public class RecruitPostCommentController {

    private final static String RECRUITPOSTCOMMENT_DEFAULT_URL = "/recruit-comments";

    private RecruitPostCommentService service;

    private MemberService memberService;

    private RecruitPostCommentMapper mapper;

    public RecruitPostCommentController(RecruitPostCommentService service,
                                        MemberService memberService,
                                        RecruitPostCommentMapper mapper) {
        this.service = service;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/{recruit-post-id}")
    public ResponseEntity postRecruitPostComment(Principal principal,
                                                 @PathVariable("recruit-post-id")long recruitPostId,
                                                 @RequestBody RecruitPostCommentPostDto recruitPostCommentPostDto){
        Member member = memberService.findVerifiedMember(principal.getName());
        RecruitPostComment recruitPostComment = service.createRecruitPostComment(member,mapper.recruitPostCommentPostDtoToRecruitPostComment(recruitPostId,recruitPostCommentPostDto));
        URI location = UriCreator.createUri(RECRUITPOSTCOMMENT_DEFAULT_URL,recruitPostComment.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{recruit-post-id}/{comment-id}")
    public ResponseEntity patchRecruitPostComment(@PathVariable("recruit-post-id")long recruitPostId,
                                                  @PathVariable("comment-id") long commentId,
                                                  @RequestBody RecruitPostCommentPatchDto recruitPostCommentPatchDto){
        recruitPostCommentPatchDto.setId(commentId);
        RecruitPostComment recruitPostComment = service.updateRecruitPostComment(mapper.recruitPostCommentPatchDtoToRecruitPostComment(recruitPostCommentPatchDto));

        return new ResponseEntity<>(mapper.recruitPostCommentToRecruitPostCommentResponseDto(recruitPostComment), HttpStatus.OK);
    }

    @GetMapping("/{recruit-post-id}")
    public ResponseEntity getRecruitPostComment(@PathVariable("recruit-post-id")long recruitPostId){
        List<RecruitPostComment> recruitPostComments = service.findRecruitPostComments(recruitPostId);
        List<RecruitPostCommentResponseDto> response = mapper.recruitPostCommentToRecruitPostCommentResponseDtos(recruitPostComments);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{recruit-post-id}/{comment-id}")
    public ResponseEntity deleteRecruitPostComment(@PathVariable("recruit-post-id")long recruitPostId,
                                                   @PathVariable("comment-id") long commentId){
        service.deleteRecruitPostComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
