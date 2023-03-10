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

    public PrfPost getPrfPost(long postId){
        // null 인 경우
        // post가 삭제된 경우 - validation 처리

        return prfPostRepository.findById(postId).get();
    }

    public void deletePrfPost(long postId){
        prfPostRepository.deleteById(postId);
    }
}
