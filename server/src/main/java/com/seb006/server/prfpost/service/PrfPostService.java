package com.seb006.server.prfpost.service;

import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.url.entity.Urls;
import com.seb006.server.prfpost.repository.PrfPostRepository;
import org.springframework.stereotype.Service;

@Service
public class PrfPostService {
    private final PrfPostRepository prfPostRepository;

    public PrfPostService(PrfPostRepository prfPostRepository) {
        this.prfPostRepository = prfPostRepository;
    }

    public PrfPost createPrfPost(PrfPost prfPost){
        return prfPostRepository.save(prfPost);
    }
}
