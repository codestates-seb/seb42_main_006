package com.seb006.server.prfpostcomment.mapper;

import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrfPostCommentMapper {

    default PrfPostComment prfPostCommentPostDtoToPrfPostComment(Long prfPostId, PrfPostCommentPostDto prfPostCommentPostDto){
        PrfPostComment prfPostComment = new PrfPostComment();
        prfPostComment.setContent(prfPostCommentPostDto.getContent());

        Member member = new Member();
        member.setEmail(prfPostCommentPostDto.getMemberEmail());

        PrfPost prfPost = new PrfPost();
        prfPost.setId(prfPostId);

        prfPostComment.setMember(member);
        prfPostComment.setPrfPost(prfPost);

        return prfPostComment;

    }



    PrfPostComment prfPostCommentPatchDtoToPrfPostComment(PrfPostCommentPatchDto prfPostCommentPatchDto);

    default PrfPostCommentResponseDto prfPostCommentToPrfPostCommentResponseDto (PrfPostComment prfPostComment){
       
        
        PrfPostCommentResponseDto prfPostCommentResponseDto = new PrfPostCommentResponseDto();
        
        prfPostCommentResponseDto.setId(prfPostComment.getId());
        prfPostCommentResponseDto.setContent(prfPostComment.getContent());
        prfPostCommentResponseDto.setNickname(prfPostComment.getMember().getNickName());
        prfPostCommentResponseDto.setCreatedAt(prfPostComment.getCreatedAt());
        prfPostCommentResponseDto.setModifiedAt(prfPostComment.getModifiedAt());
        
        
        return prfPostCommentResponseDto;
    }
    

    List<PrfPostCommentResponseDto> prfPostCommentToPrfPostCommentResponseDtos(List<PrfPostComment> prfPostComments);
}
