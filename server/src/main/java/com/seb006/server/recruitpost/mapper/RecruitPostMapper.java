package com.seb006.server.recruitpost.mapper;

import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.dto.RecruitPostDto;
import com.seb006.server.recruitpost.dto.RecruitPostPatchDto;
import com.seb006.server.recruitpost.dto.RecruitPostResponseDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecruitPostMapper {

    default RecruitPost recruitPostDtoToRecruitPost (RecruitPostDto recruitPostDto){
        RecruitPost recruitPost = new RecruitPost();

        PrfPost prfPost = new PrfPost();
        prfPost.setId(recruitPostDto.getPrfPostId());

        Member member = new Member();
        member.setId(recruitPostDto.getMemberId());
        //member.setNickName(recruitPostDto.getNickName());

        recruitPost.setPrfPost(prfPost);
        recruitPost.setMember(member);
        recruitPost.setTitle(recruitPostDto.getTitle());
        recruitPost.setCategory(recruitPostDto.getCategory());
        recruitPost.setContent(recruitPostDto.getContent());
        recruitPost.setRecruitNumber(recruitPostDto.getRecruitNumber());
        recruitPost.setDueDate(recruitPostDto.getDueDate());
        recruitPost.setAge(recruitPostDto.getAge());
        recruitPost.setTags(recruitPostDto.getTags());

        return recruitPost;
    }
    RecruitPost recruitPostPatchDtoToRecruitPost (RecruitPostPatchDto recruitPostPatchDto);
    default RecruitPostResponseDto recruitPostToRecruitPostResponseDto (RecruitPost recruitPost){
        Member member = recruitPost.getMember();

        RecruitPostResponseDto recruitPostResponseDto = new RecruitPostResponseDto();

        recruitPostResponseDto.setId(recruitPost.getId());
        recruitPostResponseDto.setTitle(recruitPost.getTitle());
        recruitPostResponseDto.setCategory(recruitPost.getCategory());
        recruitPostResponseDto.setContent(recruitPost.getContent());
        recruitPostResponseDto.setRecruitNumber(recruitPost.getRecruitNumber());
        recruitPostResponseDto.setCurrentNumber(recruitPost.getCurrentNumber());
        recruitPostResponseDto.setRecruitStatus(recruitPost.getRecruitStatus());
        recruitPostResponseDto.setDueDate(recruitPost.getDueDate());
        recruitPostResponseDto.setCreatedAt(recruitPost.getCreatedAt());
        recruitPostResponseDto.setModifiedAt(recruitPost.getModifiedAt());
        recruitPostResponseDto.setNickName(recruitPost.getMember().getNickName());
        recruitPostResponseDto.setAge(recruitPost.getAge());
        recruitPostResponseDto.setTags(recruitPost.getTags());

        return recruitPostResponseDto;
    }
    List<RecruitPostResponseDto> recruitPostsToRecruitPostResponseDtos(List<RecruitPost> recruitPosts);


}
