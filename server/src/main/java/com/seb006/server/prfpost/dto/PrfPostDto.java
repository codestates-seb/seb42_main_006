package com.seb006.server.prfpost.dto;

import com.seb006.server.url.dto.UrlDto;
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
    }

    @Setter
    @Getter
    public static class Patch{
        private String title;
        private String category;
        private String content;
        private String tags;
        private List<UrlDto> urls;
    }

    @Setter
    @Getter
    public static class Response{
        private long id;
        private String title;
        private String category;
        private String content;
        private String tags;
        private List<UrlDto> urls;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }
}
