package com.seb006.server.prfpostcomment.mapper;

import com.seb006.server.prfpostcomment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrfPostCommentMapper {

    PrfPostComment prfPostCommentPostDtoToPrfPostComment(PrfPostCommentPostDto prfPostCommentPostDto);

    PrfPostComment prfPostCommentPatchDtoToPrfPostComment(PrfPostCommentPatchDto prfPostCommentPatchDto);

    PrfPostCommentResponseDto prfPostCommentToPrfPostCommentResponseDto (PrfPostComment prfPostComment);

    List<PrfPostCommentResponseDto> prfPostCommentToPrfPostCommentResponseDtos(List<PrfPostComment> prfPostComments);
}
