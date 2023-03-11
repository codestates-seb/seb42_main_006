package com.seb006.server.prfpost.controller;

import com.seb006.server.global.response.PaginationResponse;
import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.mapper.PrfPostMapper;
import com.seb006.server.prfpost.service.PrfPostService;
import com.seb006.server.url.entity.Urls;
import com.seb006.server.url.service.UrlService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import javax.websocket.server.PathParam;
import java.util.List;

//@CrossOrigin
@RestController
@RequestMapping("/prf-posts")
public class PrfPostController {
    private final PrfPostMapper prfPostMapper;
    private final PrfPostService prfPostService;
    private final UrlService urlService;

    public PrfPostController(PrfPostMapper prfPostMapper, PrfPostService prfPostService, UrlService urlService) {
        this.prfPostMapper = prfPostMapper;
        this.prfPostService = prfPostService;
        this.urlService = urlService;
    }

    // 게시글 생성
    @PostMapping
    public ResponseEntity postPrfPost(@RequestBody PrfPostDto.Post postDto){
        PrfPost result = prfPostService.createPrfPost(prfPostMapper.postDtoToPrfPost(postDto));
        List<Urls> resultUrls = urlService.createUrls(result.getUrls());

        PrfPostDto.Response response = prfPostMapper.prfPostToResponseDto(result);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 전체 리스트 - 태그, 카테고리 필터링 X
    // sorting - 1: 최신순, 2: 인기순
    @GetMapping("/all")
    public ResponseEntity getPrfPosts(@Positive @RequestParam(defaultValue = "1") int page,
                                      @Positive @RequestParam(defaultValue = "10") int size,
                                      @Positive @RequestParam(defaultValue = "1") int sorting){
        Page<PrfPost> pageInfo = prfPostService.getAllPrfPosts(page-1, size, sorting);
        List<PrfPost> allPrfPost = pageInfo.getContent();
        List<PrfPostDto.Response> result = prfPostMapper.prfPostsToResponseDtos(allPrfPost);

        return new ResponseEntity<>(new PaginationResponse<PrfPostDto.Response>(result, pageInfo), HttpStatus.OK);
    }

    // 게시글 리스트 - 태그, 카테고리 필터링 O
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
    public ResponseEntity patchPrfPost(@PathVariable("post-id") long postId,
                                       @RequestBody PrfPostDto.Patch patchDto){
        PrfPost result = prfPostService.updatePrfPost(postId, patchDto);
        List<Urls> resultUrls = urlService.createUrls(result.getUrls());

        PrfPostDto.Response response = prfPostMapper.prfPostToResponseDto(result);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 상세보기
    @GetMapping("/{post-id}")
    public ResponseEntity getPrfPost(@PathVariable("post-id") long postId){
        PrfPost result = prfPostService.getPrfPost(postId);
        PrfPostDto.Response response = prfPostMapper.prfPostToResponseDto(result);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePrfPost(@PathVariable("post-id") long postId){
        prfPostService.deletePrfPost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
