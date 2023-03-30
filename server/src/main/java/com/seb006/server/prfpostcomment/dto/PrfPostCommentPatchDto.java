package com.seb006.server.prfpostcomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PrfPostCommentPatchDto {

    private Long id;
    private Long prfPostId;
    private String content;
}
