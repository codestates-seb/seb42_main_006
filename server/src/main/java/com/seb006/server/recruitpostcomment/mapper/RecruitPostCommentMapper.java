package com.seb006.server.recruitpostcomment.mapper;

import com.seb006.server.member.entity.Member;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentPatchDto;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentPostDto;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentResponseDto;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecruitPostCommentMapper {

    default RecruitPostComment recruitPostCommentPostDtoToRecruitPostComment(Long recruitPostId, RecruitPostCommentPostDto recruitPostCommentPostDto){
        RecruitPostComment recruitPostComment = new RecruitPostComment();
        recruitPostComment.setContent(recruitPostCommentPostDto.getContent());

        Member member = new Member();

        RecruitPost recruitPost = new RecruitPost();
        recruitPost.setId(recruitPostId);

        recruitPostComment.setMember(member);
        recruitPostComment.setRecruitPost(recruitPost);

        return recruitPostComment;
    }

    RecruitPostComment recruitPostCommentPatchDtoToRecruitPostComment(RecruitPostCommentPatchDto recruitPostCommentPatchDto);

    default RecruitPostCommentResponseDto recruitPostCommentToRecruitPostCommentResponseDto (RecruitPostComment recruitPostComment){

        RecruitPostCommentResponseDto recruitPostCommentResponseDto = new RecruitPostCommentResponseDto();

        recruitPostCommentResponseDto.setId(recruitPostComment.getId());
        recruitPostCommentResponseDto.setMemberId(recruitPostComment.getMember().getId());
        recruitPostCommentResponseDto.setNickname(recruitPostComment.getMember().getNickName());
        recruitPostCommentResponseDto.setContent(recruitPostComment.getContent());
        recruitPostCommentResponseDto.setCreatedAt(recruitPostComment.getCreatedAt());
        recruitPostCommentResponseDto.setModifiedAt(recruitPostComment.getModifiedAt());

        return recruitPostCommentResponseDto;
    }

    List<RecruitPostCommentResponseDto> recruitPostCommentToRecruitPostCommentResponseDtos(List<RecruitPostComment>recruitPostComments);

}
