package com.seb006.server.prfpost.service;

import com.seb006.server.global.Sorting;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.repository.PrfPostRepository;
import com.seb006.server.url.entity.Urls;
import com.seb006.server.url.repository.UrlRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrfPostService {
    private final PrfPostRepository prfPostRepository;
    private final UrlRepository urlRepository;
    private final Sorting sort;

    public PrfPostService(PrfPostRepository prfPostRepository, UrlRepository urlRepository, Sorting sort) {
        this.prfPostRepository = prfPostRepository;
        this.urlRepository = urlRepository;
        this.sort = sort;
    }


    public PrfPost createPrfPost(Member member, PrfPost prfPost){
        prfPost.setMember(member);
        return prfPostRepository.save(prfPost);
    }

    public PrfPost getPrfPost(long postId){
        return findverifiedPrfPost(postId);
    }

    // 전체 리스트 가져오기 - 태그, 카테고리 필터링 X
    public Page<PrfPost> getAllPrfPosts(int page, int size, int sorting){
        List<Order> orders = sort.getOrders(sorting);

        return prfPostRepository.findAll(PageRequest.of(page, size, Sort.by(orders)));
    }


    public Page<PrfPost> findPrfPostsWithKeyword(int page, int size, int sorting, String category, String keyword){
        List<Order> orders = sort.getOrders(sorting);

        if(category.isBlank() && keyword.isBlank()){ // 태그, 카테고리가 모두 없는 경우
            return prfPostRepository.findAll(PageRequest.of(page, size, Sort.by(orders)));
        } else if (category.isBlank()) {  // 카테고리가 없는 경우
            return prfPostRepository.findByTagsContainingOrTitleContaining(PageRequest.of(page, size, Sort.by(orders)),keyword, keyword);
        }
        return prfPostRepository.findByCategoryAndKeyword(PageRequest.of(page, size, Sort.by(orders)), category, keyword);
    }

    public PrfPost updatePrfPost(long postId, PrfPostDto.Patch patchDto){
        // 수정할 게시글이 있는지 확인
        PrfPost verifiedPost = findverifiedPrfPost(postId);

        Optional.ofNullable(patchDto.getTitle()).ifPresent(title -> verifiedPost.setTitle(title));
        Optional.ofNullable(patchDto.getCategory()).ifPresent(category -> verifiedPost.setCategory(category));
        Optional.ofNullable(patchDto.getContent()).ifPresent(content -> verifiedPost.setContent(content));
        Optional.ofNullable(patchDto.getTags()).ifPresent(tags -> verifiedPost.setTags(tags));
        Optional.ofNullable(patchDto.getImageKey()).ifPresent(imageKey -> verifiedPost.setImageKey(imageKey));

        // 삭제될 URL가 있는 경우
        if(patchDto.getDeletedUrls()!=null){
            List<Long> ids = patchDto.getDeletedUrls().stream().map(dto -> dto.getUrlId()).collect(Collectors.toList());
            urlRepository.deleteUrlsByIds(ids);
        }

        // 추가한 URL가 있는 경우
        if (patchDto.getNewUrls() != null){
           List<Urls> urls = patchDto.getNewUrls().stream()
                   .map(eachurl -> {
                       Urls url = new Urls();
                       url.setUrl(eachurl.getUrl());
                       url.setPrfPost(verifiedPost);
                       return url;
                   })
                   .collect(Collectors.toList());
            urlRepository.saveAll(urls);
        }

        return verifiedPost;
    }

    public void deletePrfPost(long postId){
        prfPostRepository.deleteById(postId);
    }

    // 존재하는 게시글인지 확인
    public PrfPost findverifiedPrfPost(long postId){
        Optional<PrfPost> optionalPrfPost = prfPostRepository.findById(postId);

        return optionalPrfPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRFPOST_NOT_FOUND));
    }

}
