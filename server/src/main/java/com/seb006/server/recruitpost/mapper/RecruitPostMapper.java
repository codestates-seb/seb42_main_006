package com.seb006.server.recruitpost.mapper;

import com.seb006.server.recruitpost.dto.RecruitPostDto;
import com.seb006.server.recruitpost.dto.RecruitPostPatchDto;
import com.seb006.server.recruitpost.dto.RecruitPostResponseDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecruitPostMapper {

    RecruitPost recruitPostDtoToRecruitPost (RecruitPostDto recruitPostDto);
    RecruitPost recruitPostPatchDtoToRecruitPost (RecruitPostPatchDto recruitPostPatchDto);
    RecruitPostResponseDto recruitPostToRecruitPostResponseDto (RecruitPost recruitPost);
    List<RecruitPostResponseDto> recruitPostsToRecruitPostResponseDtos(List<RecruitPost> recruitPosts);


}
