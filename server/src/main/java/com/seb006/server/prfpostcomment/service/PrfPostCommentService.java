package com.seb006.server.prfpostcomment.service;

import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import com.seb006.server.prfpostcomment.repository.PrfPostCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrfPostCommentService {

    private final PrfPostCommentRepository prfPostCommentRepository;

    public PrfPostCommentService(PrfPostCommentRepository prfPostCommentRepository) {
        this.prfPostCommentRepository = prfPostCommentRepository;

    }

    public PrfPostComment createPrfPostComment(PrfPostComment prfPostComment){

        return prfPostCommentRepository.save(prfPostComment);
    }

    public PrfPostComment updatePrfPostComment (PrfPostComment prfPostComment){
        PrfPostComment findPrfPostComment = findVerifiedPrfPostComment(prfPostComment.getId());

        Optional.ofNullable(prfPostComment.getContent())
                .ifPresent(content -> findPrfPostComment.setContent(content));

        return prfPostCommentRepository.save(findPrfPostComment);
    }

    public List<PrfPostComment> findPrfPostComments(){
        return prfPostCommentRepository.findAll();
    }

    public void deletePrfPostComment(long id){
        PrfPostComment findPrfPostComment = findVerifiedPrfPostComment(id);
        prfPostCommentRepository.deleteById(id);
    }

    public PrfPostComment findVerifiedPrfPostComment(Long id){
        Optional<PrfPostComment> optionalPrfPostComment =
                prfPostCommentRepository.findById(id);
        PrfPostComment findPrfPostComment =
                optionalPrfPostComment.orElseThrow(() ->
                        new RuntimeException("prfPostComment_NOT_FOUND"));
        return findPrfPostComment;
    }

}
