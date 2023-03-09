package com.seb006.server.prfPostComment.mapper;

import com.seb006.server.prfPostComment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfPostComment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfPostComment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfPostComment.entity.PrfPostComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrfPostCommentMapper {

    PrfPostComment prfPostCommentPostDtoToPrfPostComment(PrfPostCommentPostDto prfPostCommentPostDto);

    PrfPostComment prfPostCommentPatchDtoToPrfPostComment(PrfPostCommentPatchDto prfPostCommentPatchDto);

    PrfPostCommentResponseDto prfPostCommentToPrfPostCommentResponseDto (PrfPostComment prfPostComment);

    List<PrfPostCommentResponseDto> prfPostCommentToPrfPostCommentResponseDtos(List<PrfPostComment> prfPostComments);
}
