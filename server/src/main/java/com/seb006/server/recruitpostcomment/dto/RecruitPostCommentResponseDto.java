package com.seb006.server.recruitpostcomment.dto;

import com.seb006.server.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruitPostCommentResponseDto {

    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private Long memberId;
    private String nickname;

    public void setMember(Member member){

        this.nickname = member.getNickName();
        this.memberId = member.getId();
    }
}
