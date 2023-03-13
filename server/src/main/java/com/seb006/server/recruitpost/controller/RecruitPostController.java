package com.seb006.server.recruitpost.controller;

import com.seb006.server.global.response.MultiResponseDto;
import com.seb006.server.recruitpost.dto.RecruitPostDto;
import com.seb006.server.recruitpost.dto.RecruitPostPatchDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.mapper.RecruitPostMapper;
import com.seb006.server.recruitpost.service.RecruitPostService;
import com.seb006.server.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/recruit-posts")
public class RecruitPostController {

    private final static String RECRUITPOST_DEFAULT_URL = "/recruit-posts";

    private final RecruitPostService service;

    private final RecruitPostMapper mapper;

    public RecruitPostController(RecruitPostService service, RecruitPostMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postRecruitPost(@RequestBody RecruitPostDto recruitPostDto){
        RecruitPost recruitPost = service.createRecruitPost(mapper.recruitPostDtoToRecruitPost(recruitPostDto));

        URI location = UriCreator.createUri(RECRUITPOST_DEFAULT_URL,recruitPost.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{recruit-post-id}")
    public ResponseEntity patchRecruitPost(@PathVariable("recruit-post-id")long id,
                                           @RequestBody RecruitPostPatchDto recruitPostPatchDto){
        recruitPostPatchDto.setId(id);
        RecruitPost recruitPost = service.updateRecruitPost(mapper.recruitPostPatchDtoToRecruitPost(recruitPostPatchDto));

        return new ResponseEntity<>(mapper.recruitPostToRecruitPostResponseDto(recruitPost),HttpStatus.OK);
    }

    @GetMapping("/{recruit-post-id}")
    public ResponseEntity getRecruitPost(@PathVariable("recruit-post-id")long id){
        RecruitPost recruitPost = service.findRecruitPost(id);

        return new ResponseEntity<>(mapper.recruitPostToRecruitPostResponseDto(recruitPost),HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getRecruitPosts(@RequestParam int page,
                                          @RequestParam int size){
        Page<RecruitPost> recruitPostPage = service.findRecruitPosts(page-1,size);
        List<RecruitPost> recruitPosts = recruitPostPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.recruitPostsToRecruitPostResponseDtos(recruitPosts),recruitPostPage),
                HttpStatus.OK);
    }
    //모집글 리스트 보기(태그)

    //모집글 리스트 (카테고리)

    //모집글 닫기

    //모집 실패

    //모집 참여하기

}
