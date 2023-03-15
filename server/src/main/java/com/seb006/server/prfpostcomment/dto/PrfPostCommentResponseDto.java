package com.seb006.server.prfpostcomment.dto;

import com.seb006.server.member.dto.MemberDto;
import com.seb006.server.member.entity.Member;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrfPostCommentResponseDto {

    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    //유저 정보
    private Long memberId;
    private String nickname;

    public void setMember(Member member){
        this.nickname = member.getNickName();
    }
}
