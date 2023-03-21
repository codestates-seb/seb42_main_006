package com.seb006.server.prfpost.mapper;

import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrfPostMapper {
    // PostDto -> Entity
    PrfPost postDtoToPrfPost(PrfPostDto.Post postDto);
    // Entity -> Response
    PrfPostDto.Response prfPostToResponseDto(PrfPost prfPost, List<Long> likedPostIds);
    // Entity -> DetailResponse
    PrfPostDto.DetailResponse prfPostToDetailResponseDto(PrfPost prfPost);
    List<PrfPostDto.Response> prfPostsToResponseDtos(List<PrfPost> prfPosts);
}
