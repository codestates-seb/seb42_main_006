package com.seb006.server.recruitpost.controller;

import com.seb006.server.global.response.MultiResponseDto;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.recruitpost.dto.RecruitPostDto;
import com.seb006.server.recruitpost.dto.RecruitPostPatchDto;
import com.seb006.server.recruitpost.dto.RecruitPostResponseDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.mapper.RecruitPostMapper;
import com.seb006.server.recruitpost.service.RecruitPostService;
import com.seb006.server.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/recruit-posts")
public class RecruitPostController {

    private final static String RECRUITPOST_DEFAULT_URL = "/recruit-posts";

    private final RecruitPostService service;

    private final MemberService memberService;

    private final RecruitPostMapper mapper;


    public RecruitPostController(RecruitPostService service, MemberService memberService, RecruitPostMapper mapper) {
        this.service = service;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postRecruitPost(Principal principal,
                                          @RequestBody RecruitPostDto recruitPostDto){
        Member member = memberService.findVerifiedMember(principal.getName());
        RecruitPost recruitPost = service.createRecruitPost(member,mapper.recruitPostDtoToRecruitPost(recruitPostDto));

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

        return new ResponseEntity<>(mapper.recruitPostToRecruitDetailResponseDto(recruitPost),HttpStatus.OK);

    }

    @GetMapping("/all")
    public ResponseEntity getRecruitPosts(@RequestParam int page,
                                          @RequestParam int size,
                                          @RequestParam int sorting){
        Page<RecruitPost> recruitPostPage = service.findRecruitPosts(page-1,size,sorting);
        List<RecruitPost> recruitPosts = recruitPostPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.recruitPostsToRecruitPostResponseDtos(recruitPosts),recruitPostPage),
                HttpStatus.OK);
    }

    //모집글 삭제
    @DeleteMapping("/{recruit-post-id}")
    public ResponseEntity deleteRecruitPost(@PathVariable("recruit-post-id")long id){
        service.deleteRecruitPost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //모집글 리스트 보기(태그,카테고리)
    @GetMapping
    public ResponseEntity searchRecruitPosts( @RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "10") int size,
                                              @RequestParam(defaultValue = "1") int sorting,
                                              @RequestParam(required = false, defaultValue = "") String category,
                                              @RequestParam(required = false, defaultValue = "") String keyword){
        Page<RecruitPost> recruitPostPage = service.searchRecruitPosts(page-1, size, sorting, category, keyword);
        List<RecruitPost> recruitPostList = recruitPostPage.getContent();
        List<RecruitPostResponseDto> result = mapper.recruitPostsToRecruitPostResponseDtos(recruitPostList);

        return new ResponseEntity<>(new MultiResponseDto<RecruitPostResponseDto>(result, recruitPostPage), HttpStatus.OK);
    }

    //모집글 닫기
    @PatchMapping("/{recruit-post-id}/close")
    public ResponseEntity closeRecruitPost (@PathVariable("recruit-post-id") long id) {
        service.closeRecruitPost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //모집 실패

    //모집 참여하기

}
