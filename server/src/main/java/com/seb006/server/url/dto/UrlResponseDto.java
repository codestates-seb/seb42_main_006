package com.seb006.server.url.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UrlResponseDto {
    private long id;
    private String title;
    private String thumbnail;
    private String url;
}
