package com.seb006.server.member.mapper;

import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);

    @Mapping(source = "memberStatus.status", target = "memberStatus")
    MemberDto.Response memberToResponseDto(Member member);
}
