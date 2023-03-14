package com.seb006.server.recruitpost.service;

import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.repository.RecruitPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class RecruitPostService {

    private final RecruitPostRepository recruitPostRepository;

    public RecruitPostService(RecruitPostRepository recruitPostRepository) {

        this.recruitPostRepository = recruitPostRepository;
    }

    public RecruitPost createRecruitPost(RecruitPost recruitPost){
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
    public Page<RecruitPost> findRecruitPosts(int page, int size) {
        return recruitPostRepository.findAll(PageRequest.of(page,size,
                Sort.by("id").descending()));
    }
    //태그이름별 리스트

    //카테고리별 리스트

    public void deleteRecruitPost(long id){
        RecruitPost findRecruitPost = findVerifiedRecruitPost(id);
        recruitPostRepository.deleteById(id);
    }
    public RecruitPost findVerifiedRecruitPost(long id){
        Optional<RecruitPost> optionalRecruitPost =
                recruitPostRepository.findById(id);
        RecruitPost findRecruitPost =
                optionalRecruitPost.orElseThrow(() ->
                        new RuntimeException("RecruitPost Not Found"));
        return findRecruitPost;
    }




}
