package com.seb006.server.prfpost.mapper;

import com.seb006.server.like.service.LikeService;
import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.url.dto.UrlResponseDto;
import com.seb006.server.url.entity.Urls;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public class CustomMapper{
    @Autowired
    private LikeService likeService;

    public PrfPost postDtoToPrfPost(PrfPostDto.Post postDto) {
        if(postDto==null){
            return null;
        }
        else{
            PrfPost prfPost = new PrfPost();
            prfPost.setTitle(postDto.getTitle());
            prfPost.setCategory(postDto.getCategory());
            prfPost.setContent(postDto.getContent());
            prfPost.setTags(postDto.getTags());
            prfPost.setImageKey(postDto.getImageKey());

            if(postDto.getUrls()==null){
                // exception 발생
            }else{
                List<Urls> urls = postDto.getUrls().stream()
                        .map(eachUrl -> {
                            Urls url = new Urls();
                            url.setTitle(eachUrl.getTitle());
                            url.setThumbnail(eachUrl.getThumbnail());
                            url.setUrl(eachUrl.getUrl());
                            url.setPrfPost(prfPost);
                            return url;
                        })
                        .collect(Collectors.toList());
                prfPost.setUrls(urls);
            }
            return prfPost;
        }
    }

    public PrfPostDto.Response prfPostToResponseDto(PrfPost prfPost) {
        if(prfPost==null){
            return null;
        }
        else{
            PrfPostDto.Response response = new PrfPostDto.Response();
            response.setId(prfPost.getId());
            response.setMemberId(prfPost.getMember().getId());
            response.setMemberName(prfPost.getMember().getNickName());
            response.setTitle(prfPost.getTitle());
            response.setCategory(prfPost.getCategory());
            response.setContent(prfPost.getContent());
            response.setTags(prfPost.getTags());
            response.setLikeCount(prfPost.getLikeCount());
            response.setImageKey(prfPost.getImageKey());

            response.setUrls(prfPost.getUrls().stream()
                    .map(url ->{
                        UrlResponseDto urlDto = new UrlResponseDto();
                        urlDto.setId(url.getId());
                        urlDto.setTitle(url.getTitle());
                        urlDto.setThumbnail(url.getThumbnail());
                        urlDto.setUrl(url.getUrl());
                        return urlDto;
                    })
                    .collect(Collectors.toList()));

            response.setCreateAt(prfPost.getCreatedAt());
            response.setModifiedAt(prfPost.getModifiedAt());

            return response;
        }
    }

    public PrfPostDto.Response prfPostToResponseDto(PrfPost prfPost, List<Long> likedPostIds) {
        if(prfPost==null){
            return null;
        }
        else{
            PrfPostDto.Response response = new PrfPostDto.Response();
            response.setId(prfPost.getId());
            response.setMemberId(prfPost.getMember().getId());
            response.setMemberName(prfPost.getMember().getNickName());
            response.setTitle(prfPost.getTitle());
            response.setCategory(prfPost.getCategory());
            response.setContent(prfPost.getContent());
            response.setTags(prfPost.getTags());
            response.setLikeCount(prfPost.getLikeCount());
            response.setImageKey(prfPost.getImageKey());

            response.setUrls(prfPost.getUrls().stream()
                    .map(url ->{
                        UrlResponseDto urlDto = new UrlResponseDto();
                        urlDto.setId(url.getId());
                        urlDto.setTitle(url.getTitle());
                        urlDto.setThumbnail(url.getThumbnail());
                        urlDto.setUrl(url.getUrl());
                        return urlDto;
                    })
                    .collect(Collectors.toList()));

            if(likedPostIds.contains(response.getId())){
                response.setLiked(true);
            }

            response.setCreateAt(prfPost.getCreatedAt());
            response.setModifiedAt(prfPost.getModifiedAt());

            return response;
        }
    }

    public PrfPostDto.DetailResponse prfPostToDetailResponseDto(PrfPost prfPost) {
        if(prfPost==null){
            return null;
        }
        else{
            PrfPostDto.DetailResponse response = new PrfPostDto.DetailResponse();
            response.setId(prfPost.getId());
            response.setMemberId(prfPost.getMember().getId());
            response.setMemberName(prfPost.getMember().getNickName());
            response.setTitle(prfPost.getTitle());
            response.setCategory(prfPost.getCategory());
            response.setContent(prfPost.getContent());
            response.setTags(prfPost.getTags());
            response.setLikeCount(prfPost.getLikeCount());
            response.setImageKey(prfPost.getImageKey());

            response.setComments(prfPost.getComments().stream()
                    .map(comment -> {
                        PrfPostCommentResponseDto.PrfPostCommentResponseDtoBuilder prfPostCommentResponseDto = PrfPostCommentResponseDto.builder();
                        prfPostCommentResponseDto.id(comment.getId());
                        prfPostCommentResponseDto.content(comment.getContent());
                        prfPostCommentResponseDto.createdAt(comment.getCreatedAt());
                        prfPostCommentResponseDto.modifiedAt(comment.getModifiedAt());
                        prfPostCommentResponseDto.memberId(comment.getMember().getId());
                        prfPostCommentResponseDto.nickname(comment.getMember().getNickName());
                        return prfPostCommentResponseDto.build();
                    })
                    .collect(Collectors.toList()));

            response.setUrls(prfPost.getUrls().stream()
                    .map(url ->{
                        UrlResponseDto urlDto = new UrlResponseDto();
                        urlDto.setId(url.getId());
                        urlDto.setTitle(url.getTitle());
                        urlDto.setThumbnail(url.getThumbnail());
                        urlDto.setUrl(url.getUrl());
                        return urlDto;
                    })
                    .collect(Collectors.toList()));

            response.setCreateAt(prfPost.getCreatedAt());
            response.setModifiedAt(prfPost.getModifiedAt());

            return response;
        }
    }

    public List<PrfPostDto.Response> prfPostsToResponseDtos(List<PrfPost> prfPosts, List<Long> likedPostIds) {
        List<PrfPostDto.Response> responses = prfPosts.stream()
                .map(e -> prfPostToResponseDto(e, likedPostIds))
                .collect(Collectors.toList());
        return responses;
    }

    public List<PrfPostDto.Response> prfPostsToResponseDtos(List<PrfPost> prfPosts) {
        List<PrfPostDto.Response> responses = prfPosts.stream()
                .map(this::prfPostToResponseDto)
                .collect(Collectors.toList());
        return responses;
    }
}
