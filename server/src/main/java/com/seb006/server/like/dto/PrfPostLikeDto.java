package com.seb006.server.like.dto;

import lombok.Getter;
import lombok.Setter;

public class PrfPostLikeDto {
    @Setter
    @Getter
    public static class Response{
        int likeCount;

        public Response(int likeCount){
            this.likeCount = likeCount;
        }
    }
}
