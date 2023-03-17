package com.seb006.server.participation.mapper;

import com.seb006.server.member.entity.Member;
import com.seb006.server.participation.dto.ParticipationDto;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.recruitpost.dto.RecruitPostResponseDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.mapstruct.Mapper;

import java.security.Principal;

@Mapper(componentModel = "spring")
public interface ParticipationMapper {

    default ParticipationDto.Response participationToParticipationResponseDto (RecruitPost recruitPost, Participation participation) {

        Member member = recruitPost.getMember();

        ParticipationDto.Response responseDto = new ParticipationDto.Response();

        responseDto.setId(recruitPost.getId());
        responseDto.setTitle(recruitPost.getTitle());
        responseDto.setCategory(recruitPost.getCategory());
        responseDto.setContent(recruitPost.getContent());
        responseDto.setRecruitNumber(recruitPost.getRecruitNumber());
        responseDto.setCurrentNumber(recruitPost.getCurrentNumber());
        responseDto.setRecruitStatus(recruitPost.getRecruitStatus());
        responseDto.setDueDate(recruitPost.getDueDate());
        responseDto.setCreatedAt(recruitPost.getCreatedAt());
        responseDto.setModifiedAt(recruitPost.getModifiedAt());
        responseDto.setMemberId(participation.getMember().getId());
        responseDto.setNickName(participation.getMember().getNickName());
        responseDto.setAge(recruitPost.getAge());
        responseDto.setTags(recruitPost.getTags());
        responseDto.setLikeCount(recruitPost.getLikeCount());

        return responseDto;
    }
}
