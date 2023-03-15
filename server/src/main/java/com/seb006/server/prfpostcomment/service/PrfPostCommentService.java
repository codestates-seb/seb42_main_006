package com.seb006.server.prfpostcomment.service;

import com.seb006.server.member.entity.Member;
import com.seb006.server.member.service.MemberService;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.repository.PrfPostRepository;
import com.seb006.server.prfpost.service.PrfPostService;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import com.seb006.server.prfpostcomment.repository.PrfPostCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrfPostCommentService {

    private final PrfPostCommentRepository prfPostCommentRepository;
    private final PrfPostService prfPostService;
    private final MemberService memberService;

    public PrfPostCommentService(PrfPostCommentRepository prfPostCommentRepository,
                                 PrfPostService prfPostService,
                                 MemberService memberService) {
        this.prfPostCommentRepository = prfPostCommentRepository;
        this.prfPostService = prfPostService;
        this.memberService = memberService;
    }

    public PrfPostComment createPrfPostComment(Member member,PrfPostComment prfPostComment){

        PrfPost prfPost = prfPostService.findverifiedPrfPost(prfPostComment.getPrfPost().getId());

        //Member member = memberService.findVerifiedMember(prfPostComment.getMember().getEmail());

        prfPostComment.setPrfPost(prfPost);
        prfPostComment.setMember(member);

        return prfPostCommentRepository.save(prfPostComment);
    }

    public PrfPostComment updatePrfPostComment (PrfPostComment prfPostComment){
        PrfPostComment findPrfPostComment = findVerifiedPrfPostComment(prfPostComment.getId());

        Optional.ofNullable(prfPostComment.getContent())
                .ifPresent(content -> findPrfPostComment.setContent(content));

        return prfPostCommentRepository.save(findPrfPostComment);
    }

    public PrfPostComment findPrfPostComment(long id){
        return findVerifiedPrfPostComment(id);
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
