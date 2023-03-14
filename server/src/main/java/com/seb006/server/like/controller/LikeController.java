package com.seb006.server.like.controller;

import com.seb006.server.like.service.LikeService;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/like")
public class LikeController {
    private final MemberService memberService;
    private final LikeService likeService;

    public LikeController(MemberService memberService, LikeService likeService) {
        this.memberService = memberService;
        this.likeService = likeService;
    }

    @PostMapping("/prf-posts/{prf-post-id}")
    public ResponseEntity addPrfPostLike(Principal principal, @PathVariable("prf-post-id") long prfPostId){
        Member member = memberService.findVerifiedMember(principal.getName());
        likeService.addPrfPostLike(member, prfPostId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/recruit-posts/{recruit-post-id}")
    public ResponseEntity addRecruitPostLike(){
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("prf-posts/count")
    public ResponseEntity getPrfPostLike(){
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("recruit-posts/count")
    public ResponseEntity addPrfPostLike(){
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/prf-posts/{prf-post-id}")
    public ResponseEntity cancelPrfPostLike(){
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/recruit-posts/{recruit-post-id}")
    public ResponseEntity cancelRecruitPostLike(){
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
