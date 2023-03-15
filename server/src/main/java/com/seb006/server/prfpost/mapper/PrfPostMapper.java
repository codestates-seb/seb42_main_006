package com.seb006.server.prfpost.mapper;

import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.url.dto.UrlDto;
import com.seb006.server.url.dto.UrlResponseDto;
import com.seb006.server.url.entity.Urls;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PrfPostMapper {
    // PostDto -> Entity
    default PrfPost postDtoToPrfPost(PrfPostDto.Post postDto){
        if(postDto==null){
            return null;
        }
        else{
            PrfPost prfPost = new PrfPost();
            prfPost.setTitle(postDto.getTitle());
            prfPost.setCategory(postDto.getCategory());
            prfPost.setContent(postDto.getContent());
            prfPost.setTags(postDto.getTags());

            if(postDto.getUrls()==null){
                // exception 발생
            }else{
                List<Urls> urls = postDto.getUrls().stream()
                        .map(eachUrl -> {
                            Urls url = new Urls();
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

    // Entity -> Response
    default PrfPostDto.Response prfPostToResponseDto(PrfPost prfPost){
        if(prfPost==null){
            return null;
        }
        else{
            PrfPostDto.Response response = new PrfPostDto.Response();
            response.setId(prfPost.getId());
            response.setMemberName(prfPost.getMember().getNickName());
            response.setTitle(prfPost.getTitle());
            response.setCategory(prfPost.getCategory());
            response.setContent(prfPost.getContent());
            response.setTags(prfPost.getTags());
            response.setLikeCount(prfPost.getLikeCount());

            response.setUrls(prfPost.getUrls().stream()
                    .map(url ->{
                        UrlResponseDto urlDto = new UrlResponseDto();
                        urlDto.setId(url.getId());
                        urlDto.setUrl(url.getUrl());
                        return urlDto;
                    })
                    .collect(Collectors.toList()));

            response.setCreateAt(prfPost.getCreatedAt());
            response.setModifiedAt(prfPost.getModifiedAt());

            return response;
        }
    }

    // Entity -> DetailResponse
    default PrfPostDto.DetailResponse prfPostToDetailResponseDto(PrfPost prfPost){
        if(prfPost==null){
            return null;
        }
        else{
            PrfPostDto.DetailResponse response = new PrfPostDto.DetailResponse();
            response.setId(prfPost.getId());
            response.setMemberName(prfPost.getMember().getNickName());
            response.setTitle(prfPost.getTitle());
            response.setCategory(prfPost.getCategory());
            response.setContent(prfPost.getContent());
            response.setTags(prfPost.getTags());
            response.setLikeCount(prfPost.getLikeCount());

            response.setComments(prfPost.getComments().stream()
                    .map(comment -> {
                        PrfPostCommentResponseDto.PrfPostCommentResponseDtoBuilder prfPostCommentResponseDto = PrfPostCommentResponseDto.builder();
                        prfPostCommentResponseDto.id(comment.getId());
                        prfPostCommentResponseDto.content(comment.getContent());
                        return prfPostCommentResponseDto.build();
                    })
                    .collect(Collectors.toList()));

            response.setUrls(prfPost.getUrls().stream()
                    .map(url ->{
                        UrlResponseDto urlDto = new UrlResponseDto();
                        urlDto.setId(url.getId());
                        urlDto.setUrl(url.getUrl());
                        return urlDto;
                    })
                    .collect(Collectors.toList()));

            response.setCreateAt(prfPost.getCreatedAt());
            response.setModifiedAt(prfPost.getModifiedAt());

            return response;
        }
    }


    List<PrfPostDto.Response> prfPostsToResponseDtos(List<PrfPost> prfPosts);
}
