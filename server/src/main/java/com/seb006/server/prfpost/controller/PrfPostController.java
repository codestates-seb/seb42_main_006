package com.seb006.server.prfpost.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

//@CrossOrigin
@RestController
@RequestMapping("/prf-posts")
public class PrfPostController {
    // 게시글 생성
    @PostMapping
    public ResponseEntity postPrfPost(){

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 게시글 리스트
    // sorting - 1: 최신순, 2: 인기순
    @GetMapping
    public ResponseEntity getPrfPosts(@Positive @RequestParam(defaultValue = "1") int page,
                                      @Positive @RequestParam(defaultValue = "10") int size,
                                      @Positive @RequestParam(defaultValue = "1") int sorting,
                                      @RequestParam(required = false) String category,
                                      @RequestParam(required = false) String tagName){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPrfPost(){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 상세보기
    @GetMapping("/{post-id}")
    public ResponseEntity getPrfPost(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePrfPost(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
