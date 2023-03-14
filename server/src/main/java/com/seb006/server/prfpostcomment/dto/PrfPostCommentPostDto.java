package com.seb006.server.prfpostcomment.dto;

import com.seb006.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PrfPostCommentPostDto {

    private String memberEmail;

    private String content;

}
