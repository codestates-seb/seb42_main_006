package com.seb006.server.url.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Setter
@Getter
public class UrlDto {
    private String title;
    private String thumbnail;
    private String url;
}
