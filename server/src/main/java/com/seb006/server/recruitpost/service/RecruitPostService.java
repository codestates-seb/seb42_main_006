package com.seb006.server.recruitpost.service;

import com.seb006.server.global.Sorting;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.repository.RecruitPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class RecruitPostService {

    private final RecruitPostRepository recruitPostRepository;
    private final Sorting sort;

    public RecruitPostService(RecruitPostRepository recruitPostRepository, Sorting sort) {

        this.recruitPostRepository = recruitPostRepository;
        this.sort = sort;
    }

    public RecruitPost createRecruitPost(Member member,RecruitPost recruitPost){

        recruitPost.setMember(member);

        return recruitPostRepository.save(recruitPost);
    }

    public RecruitPost updateRecruitPost(RecruitPost recruitPost){
        RecruitPost findRecruitPost = findVerifiedRecruitPost(recruitPost.getId());

        Optional.ofNullable(recruitPost.getTitle())
                .ifPresent(title -> findRecruitPost.setTitle(title));
        Optional.ofNullable(recruitPost.getCategory())
                .ifPresent(category-> findRecruitPost.setCategory(category));
        Optional.ofNullable(recruitPost.getContent())
                .ifPresent(content -> findRecruitPost.setContent(content));
        Optional.ofNullable(recruitPost.getRecruitStatus())
                .ifPresent(recruitStatus -> findRecruitPost.setRecruitStatus(recruitStatus));
        Optional.ofNullable(recruitPost.getRecruitNumber())
                .ifPresent(recruitNumber -> findRecruitPost.setRecruitNumber(recruitNumber));
        Optional.ofNullable(recruitPost.getAge())
                .ifPresent(age -> findRecruitPost.setAge(age));
        Optional.ofNullable(recruitPost.getTags())
                .ifPresent(tags -> findRecruitPost.setTags(tags));

        return recruitPostRepository.save(findRecruitPost);

    }

    public RecruitPost findRecruitPost(long id){
        return findVerifiedRecruitPost(id);
    }
    // 모집글 리스트 보기 최신순
    public Page<RecruitPost> findRecruitPosts(int page, int size, int sorting) {
        List<Sort.Order> orders = sort.getOrders(sorting);

        return recruitPostRepository.findAll(PageRequest.of(page,size, Sort.by(orders)));
    }

    //태그,카테고리 검색
    public Page<RecruitPost> searchRecruitPosts(int page, int size, int sorting, String category, String keyword){
        List<Sort.Order> orders = sort.getOrders(sorting);

        if(category.isBlank() && keyword.isBlank()) { // 태그 카테고리 X
            return recruitPostRepository.findAll(PageRequest.of(page, size, Sort.by(orders)));
        } else if (category.isBlank()) {  // 카테고리X
            return recruitPostRepository.findByTagsContainingOrTitleContaining(PageRequest.of(page, size, Sort.by(orders)),keyword, keyword);
        }
        return recruitPostRepository.findByCategoryAndKeyword(PageRequest.of(page, size, Sort.by(orders)), category, keyword);
    }


    public void deleteRecruitPost(long id){
        RecruitPost findRecruitPost = findVerifiedRecruitPost(id);
        recruitPostRepository.deleteById(id);
    }
    public RecruitPost findVerifiedRecruitPost(long id){
        Optional<RecruitPost> optionalRecruitPost =
                recruitPostRepository.findById(id);
        RecruitPost findRecruitPost =
                optionalRecruitPost.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.RECRUITPOST_NOT_FOUND));
        return findRecruitPost;
    }

    //모집글 닫기
    public void closeRecruitPost (long id) {
        RecruitPost findRecruitPost = findVerifiedRecruitPost(id);

        findRecruitPost.setRecruitStatus(RecruitPost.RecruitStatus.CLOSE);

        recruitPostRepository.save(findRecruitPost);

    }

}
