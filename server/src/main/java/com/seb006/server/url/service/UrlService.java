package com.seb006.server.url.service;

import com.seb006.server.url.entity.Urls;
import com.seb006.server.url.repository.UrlRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrlService {
    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public List<Urls> createUrls(List<Urls> urls){
        return urlRepository.saveAll(urls);
    }

}
