package com.seb006.server.member.mapper;

import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);

    MemberDto.Response memberToResponseDto(Member member);
}
