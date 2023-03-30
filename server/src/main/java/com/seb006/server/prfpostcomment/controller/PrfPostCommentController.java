package com.seb006.server.prfpostcomment.controller;

import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import com.seb006.server.prfpostcomment.mapper.PrfPostCommentMapper;
import com.seb006.server.prfpostcomment.service.PrfPostCommentService;
import com.seb006.server.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RequestMapping("/prf-comments")
@RestController
public class PrfPostCommentController {

    private final static String PRFPOSTCOMMENT_DEFAULT_URL = "/prf-comments";

    private PrfPostCommentService service;

    private MemberService memberService;

    private PrfPostCommentMapper mapper;

    public PrfPostCommentController(PrfPostCommentService service, MemberService memberService, PrfPostCommentMapper mapper) {
        this.service = service;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/{prf-post-id}")
    public ResponseEntity postPrfPostComment(Principal principal,
                                             @PathVariable("prf-post-id") long prfPostId,
                                             @RequestBody PrfPostCommentPostDto prfPostCommentPostDto){
        Member member = memberService.findVerifiedMember(principal.getName());
        PrfPostComment prfPostComment = service.createPrfPostComment(member,mapper.prfPostCommentPostDtoToPrfPostComment(prfPostId,prfPostCommentPostDto));
        URI location = UriCreator.createUri(PRFPOSTCOMMENT_DEFAULT_URL,prfPostComment.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{prf-post-id}/{comment-id}")
    public ResponseEntity patchPrfPostComment (@PathVariable("prf-post-id") long prfPostId,
                                               @PathVariable("comment-id") long commentId,
                                               @RequestBody PrfPostCommentPatchDto prfPostCommentPatchDto){
        prfPostCommentPatchDto.setId(commentId);
        PrfPostComment prfPostComment = service.updatePrfPostComment(mapper.prfPostCommentPatchDtoToPrfPostComment(prfPostCommentPatchDto));

        return new ResponseEntity<>(mapper.prfPostCommentToPrfPostCommentResponseDto(prfPostComment), HttpStatus.OK);

    }
    // 댓글 전체 보기 /prf-comments/{prf-post-id} -> 게시글에 있는 댓글 전체 조회
    @GetMapping("/{prf-post-id}")
    public ResponseEntity getPrfPostComments(@PathVariable("prf-post-id") long prfPostId) {
        List<PrfPostComment> prfPostComments = service.findPrfPostComments(prfPostId);
        List<PrfPostCommentResponseDto> response = mapper.prfPostCommentToPrfPostCommentResponseDtos(prfPostComments);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{prf-post-id}/{comment-id}")
    public ResponseEntity deletePrfPostComment(@PathVariable("prf-post-id") long prfPostId,
                                               @PathVariable("comment-id") long commentId){
        service.deletePrfPostComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
