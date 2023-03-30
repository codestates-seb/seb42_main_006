package com.seb006.server.prfpost.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.url.dto.DeletedUrlDto;
import com.seb006.server.url.dto.UrlDto;
import com.seb006.server.url.dto.UrlResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class PrfPostDto {
    @Setter
    @Getter
    public static class Post{
        private String title;
        private String category;
        private String content;
        private String tags;
        private List<UrlDto> urls;
        private String imageKey;
    }

    @Setter
    @Getter
    public static class Patch{
        private String title;
        private String category;
        private String content;
        private String tags;
        private List<UrlDto> newUrls;
        private List<DeletedUrlDto> deletedUrls;
        private String imageKey;
    }

    @Setter
    @Getter
    public static class Response{
        private long id;
        private long memberId;
        private String memberName;
        private String title;
        private String category;
        private String content;
        private String tags;
        private Integer likeCount;
        private boolean isLiked = false;
        private List<UrlResponseDto> urls;
        private String imageKey;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createAt;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime modifiedAt;
    }

    @Setter
    @Getter
    public static class DetailResponse{
        private long id;
        private long memberId;
        private String memberName;
        private String title;
        private String category;
        private String content;
        private String tags;
        private Integer likeCount;
        private boolean isLiked = false;
        private List<UrlResponseDto> urls;
        private List<PrfPostCommentResponseDto> comments;
        private String imageKey;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createAt;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime modifiedAt;
    }
}
