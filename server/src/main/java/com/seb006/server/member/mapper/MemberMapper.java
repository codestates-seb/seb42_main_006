package com.seb006.server.member.mapper;

import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.dto.MemberPostsDto;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    @Mapping(source = "memberStatus.status", target = "memberStatus")
    MemberDto.Response memberToResponseDto(Member member);

    List<MemberPostsDto> prfPostsToMemberPostsDtos(List<PrfPost> prfPosts);

    List<MemberPostsDto> recruitPostsToMemberPostsDtos(List<RecruitPost> recruitPosts);
}
