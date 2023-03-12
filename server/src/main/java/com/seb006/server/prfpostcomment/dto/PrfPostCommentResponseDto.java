package com.seb006.server.prfpostcomment.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PrfPostCommentResponseDto {

    private Long id;

    private String content;

    //유저 정보
}
