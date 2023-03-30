package com.seb006.server.like.dto;

import lombok.Getter;
import lombok.Setter;

public class RecruitPostLikeDto {
    @Setter
    @Getter
    public static class Response{
        int likeCount;
    }
}
