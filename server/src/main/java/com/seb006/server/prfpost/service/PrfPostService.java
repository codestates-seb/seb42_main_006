package com.seb006.server.prfpost.service;

import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.repository.PrfPostRepository;
import com.seb006.server.url.entity.Urls;
import com.seb006.server.url.repository.UrlRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrfPostService {
    private final PrfPostRepository prfPostRepository;
    private final UrlRepository urlRepository;

    public PrfPostService(PrfPostRepository prfPostRepository, UrlRepository urlRepository) {
        this.prfPostRepository = prfPostRepository;
        this.urlRepository = urlRepository;
    }

    public PrfPost createPrfPost(PrfPost prfPost){
        return prfPostRepository.save(prfPost);
    }

    public PrfPost getPrfPost(long postId){
        return verifiedPrfPost(postId);
    }

    // 전체 리스트 가져오기 - 태그, 카테고리 필터링 X
    public Page<PrfPost> getAllPrfPosts(int page, int size, int sorting){
        // 인기순 정렬(좋아요 순)
        if(sorting == 2){
            // TODO: 좋아요 구현하고 나서 작성하기
        }
        // 최신순 정렬
        return prfPostRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    public PrfPost updatePrfPost(long postId, PrfPostDto.Patch patchDto){
        // 수정할 게시글이 있는지 확인
        PrfPost verifiedPost = verifiedPrfPost(postId);

        Optional.ofNullable(patchDto.getTitle()).ifPresent(title -> verifiedPost.setTitle(title));
        Optional.ofNullable(patchDto.getCategory()).ifPresent(category -> verifiedPost.setCategory(category));
        Optional.ofNullable(patchDto.getContent()).ifPresent(content -> verifiedPost.setContent(content));
        Optional.ofNullable(patchDto.getTags()).ifPresent(tags -> verifiedPost.setTags(tags));

        // 이미 존재하는 모든 URL 삭제
        urlRepository.deleteUrlsByPrfPostId(postId);

        // 입력 받은 모든 URL 추가
        if (patchDto.getUrls() != null){
           List<Urls> urls = patchDto.getUrls().stream()
                   .map(eachurl -> {
                       Urls url = new Urls();
                       url.setUrl(eachurl.getUrl());
                       url.setPrfPost(verifiedPost);
                       return url;
                   })
                   .collect(Collectors.toList());
           verifiedPost.setUrls(urls);
        }
        return verifiedPost;

    }

    public void deletePrfPost(long postId){
        prfPostRepository.deleteById(postId);
    }

    // 존재하는 게시글인지 확인
    public PrfPost verifiedPrfPost(long postId){
        // TODO: exception 처리하기
        return prfPostRepository.findById(postId).orElse(null);
    }
}
