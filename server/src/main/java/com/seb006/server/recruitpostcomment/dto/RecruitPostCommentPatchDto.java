package com.seb006.server.recruitpostcomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RecruitPostCommentPatchDto {

    private Long id;
    private String content;
}
