package com.seb006.server.prfPostComment.controller;

import com.seb006.server.prfPostComment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfPostComment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfPostComment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfPostComment.entity.PrfPostComment;
import com.seb006.server.prfPostComment.mapper.PrfPostCommentMapper;
import com.seb006.server.prfPostComment.service.PrfPostCommentService;
import com.seb006.server.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequestMapping("/prf-comments")
@RestController
public class PrfPostCommentController {

    private final static String PRFPOSTCOMMENT_DEFAULT_URL = "/Prf-comments";

    private PrfPostCommentService service;

    private PrfPostCommentMapper mapper;

    public PrfPostCommentController(PrfPostCommentService service, PrfPostCommentMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/{prf-post-id}")
    public ResponseEntity postPrfPostComment(@PathVariable("prf-post-id") long id,
                                             @RequestBody PrfPostCommentPostDto prfPostCommentPostDto){
        PrfPostComment prfPostComment = service.createPrfPostComment(mapper.prfPostCommentPostDtoToPrfPostComment(prfPostCommentPostDto));
        URI location = UriCreator.createUri(PRFPOSTCOMMENT_DEFAULT_URL,prfPostComment.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{prf-post-id}/{comment-id}")
    public ResponseEntity patchPrfPostComment (@PathVariable("prf-post-id") long prfPostId,
                                               @PathVariable("comment-id") long id,
                                               @RequestBody PrfPostCommentPatchDto prfPostCommentPatchDto){
        prfPostCommentPatchDto.setId(id);
        PrfPostComment prfPostComment = service.updatePrfPostComment(mapper.prfPostCommentPatchDtoToPrfPostComment(prfPostCommentPatchDto));

        return new ResponseEntity<>(mapper.prfPostCommentToPrfPostCommentResponseDto(prfPostComment), HttpStatus.OK);

    }
    // 댓글 전체 보기 /prf-comments/{prf-post-id} -> 게시글에 있는 댓글 전체 조회
    @GetMapping("/{prf-post-id}")
    public ResponseEntity getPrfPostComment(@PathVariable("prf-post-id") long prfPostId) {
        List<PrfPostComment> prfPostComments = service.findPrfPostComments();
        List<PrfPostCommentResponseDto> response = mapper.prfPostCommentToPrfPostCommentResponseDtos(prfPostComments);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{prf-post-id}/{comment-id}")
    public ResponseEntity deletePrfPostComment(@PathVariable("prf-post-id") long prfPostId,
                                               @PathVariable("comment-id") long id){
        service.deletePrfPostComment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
