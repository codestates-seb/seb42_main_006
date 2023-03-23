package com.seb006.server.prfpost.controller;

import com.seb006.server.global.response.MultiResponseDto;
import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.like.service.LikeService;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.mapper.CustomMapper;
import com.seb006.server.prfpost.service.PrfPostService;
import com.seb006.server.url.entity.Urls;
import com.seb006.server.url.service.UrlService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;

//@CrossOrigin
@RestController
@RequestMapping("/prf-posts")
public class PrfPostController {
    private final CustomMapper customMapper;
    private final MemberService memberService;
    private final PrfPostService prfPostService;
    private final UrlService urlService;
    private final LikeService likeService;

    public PrfPostController(CustomMapper customMapper, MemberService memberService, PrfPostService prfPostService, UrlService urlService, LikeService likeService) {
        this.customMapper = customMapper;
        this.memberService = memberService;
        this.prfPostService = prfPostService;
        this.urlService = urlService;
        this.likeService = likeService;
    }


    // 게시글 생성
    @PostMapping
    public ResponseEntity postPrfPost(Principal principal,
                                      @RequestBody PrfPostDto.Post postDto){
        Member member = memberService.findVerifiedMember(principal.getName());
        PrfPost result = prfPostService.createPrfPost(member, customMapper.postDtoToPrfPost(postDto));
        List<Urls> resultUrls = urlService.createUrls(result.getUrls());

        PrfPostDto.Response response = customMapper.prfPostToResponseDto(result);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 전체 리스트 - 태그, 카테고리 필터링 X
    @GetMapping("/all")
    public ResponseEntity getPrfPosts(@Positive @RequestParam(defaultValue = "1") int page,
                                      @Positive @RequestParam(defaultValue = "10") int size,
                                      @Positive @RequestParam(defaultValue = "1") int sorting){
        Object principalObj = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // anonymousUser

        Page<PrfPost> pageInfo = prfPostService.getAllPrfPosts(page-1, size, sorting);
        List<PrfPost> allPrfPost = pageInfo.getContent();

        if(principalObj == "anonymousUser"){ // 비로그인 시에
            List<PrfPostDto.Response> result = customMapper.prfPostsToResponseDtos(allPrfPost);
            return new ResponseEntity<>(new MultiResponseDto<PrfPostDto.Response>(result, pageInfo), HttpStatus.OK);
        }

        Member member = memberService.findVerifiedMember((String) principalObj);

        List<Long> likedPostIds = likeService.prfPostLiked(member, allPrfPost);
        List<PrfPostDto.Response> result = customMapper.prfPostsToResponseDtos(allPrfPost, likedPostIds);

        return new ResponseEntity<>(new MultiResponseDto<PrfPostDto.Response>(result, pageInfo), HttpStatus.OK);
    }


    // 게시글 리스트 - 태그, 카테고리 필터링 O
    @GetMapping
    public ResponseEntity getPrfPostsWithKeyword(@Positive @RequestParam(defaultValue = "1") int page,
                                                 @Positive @RequestParam(defaultValue = "10") int size,
                                                 @Positive @RequestParam(defaultValue = "1") int sorting,
                                                 @RequestParam(required = false, defaultValue = "") String category,
                                                 @RequestParam(required = false, defaultValue = "") String keyword){
        Object principalObj = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // anonymousUser
        Page<PrfPost> pageInfo = prfPostService.findPrfPostsWithKeyword(page-1, size, sorting, category, keyword);
        List<PrfPost> allPrfPost = pageInfo.getContent();

        if(principalObj == "anonymousUser"){ // 비로그인 시에
            List<PrfPostDto.Response> result = customMapper.prfPostsToResponseDtos(allPrfPost);
            return new ResponseEntity<>(new MultiResponseDto<PrfPostDto.Response>(result, pageInfo), HttpStatus.OK);
        }

        Member member = memberService.findVerifiedMember((String) principalObj);

        List<Long> likedPostIds = likeService.prfPostLiked(member, allPrfPost);
        List<PrfPostDto.Response> result = customMapper.prfPostsToResponseDtos(allPrfPost, likedPostIds);

        return new ResponseEntity<>(new MultiResponseDto<PrfPostDto.Response>(result, pageInfo), HttpStatus.OK);
    }

    // 게시글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPrfPost(@PathVariable("post-id") long postId,
                                       @RequestBody PrfPostDto.Patch patchDto){
        PrfPost result = prfPostService.updatePrfPost(postId, patchDto);

        PrfPostDto.Response response = customMapper.prfPostToResponseDto(result);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 상세보기
    @GetMapping("/{post-id}")
    public ResponseEntity getPrfPost(Principal principal, @PathVariable("post-id") long postId){
        Member member = memberService.findVerifiedMember(principal.getName());
        PrfPost result = prfPostService.getPrfPost(postId);

        PrfPostDto.DetailResponse response = customMapper.prfPostToDetailResponseDto(result);

        if(likeService.isPrfPostLiked(member, result)){
            response.setLiked(true);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePrfPost(@PathVariable("post-id") long postId){
        prfPostService.deletePrfPost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
