package com.seb006.server.like.controller;

import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.like.service.LikeService;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.service.PrfPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/like")
public class LikeController {
    private final MemberService memberService;
    private final LikeService likeService;
    private final PrfPostService prfPostService;

    public LikeController(MemberService memberService, LikeService likeService, PrfPostService prfPostService) {
        this.memberService = memberService;
        this.likeService = likeService;
        this.prfPostService = prfPostService;
    }

    @PostMapping("/prf-posts/{prf-post-id}")
    public ResponseEntity postPrfPostLike(Principal principal, @PathVariable("prf-post-id") long prfPostId){
        Member member = memberService.findVerifiedMember(principal.getName());
        PrfPost prfPost = prfPostService.findverifiedPrfPost(prfPostId);

        PrfPostLike prfPostLike = likeService.addPrfPostLike(member, prfPost);

        return new ResponseEntity(HttpStatus.CREATED);
    }

//    @PostMapping("/recruit-posts/{recruit-post-id}")
//    public ResponseEntity postRecruitPostLike(){
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
//
//    @GetMapping("prf-posts/count")
//    public ResponseEntity getPrfPostLike(){
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @GetMapping("recruit-posts/count")
//    public ResponseEntity getRecruitPostLike(){
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @DeleteMapping("/prf-posts/{prf-post-id}")
//    public ResponseEntity deletePrfPostLike(){
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
//
//    @DeleteMapping("/recruit-posts/{recruit-post-id}")
//    public ResponseEntity deleteRecruitPostLike(){
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
}
