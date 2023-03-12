package com.seb006.server.prfpostcomment.mapper;

import com.seb006.server.prfpostcomment.dto.PrfPostCommentPatchDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentPostDto;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-10T01:24:47+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class PrfPostCommentMapperImpl implements PrfPostCommentMapper {

    @Override
    public PrfPostComment prfPostCommentPostDtoToPrfPostComment(PrfPostCommentPostDto prfPostCommentPostDto) {
        if ( prfPostCommentPostDto == null ) {
            return null;
        }

        PrfPostComment prfPostComment = new PrfPostComment();

        prfPostComment.setContent( prfPostCommentPostDto.getContent() );

        return prfPostComment;
    }

    @Override
    public PrfPostComment prfPostCommentPatchDtoToPrfPostComment(PrfPostCommentPatchDto prfPostCommentPatchDto) {
        if ( prfPostCommentPatchDto == null ) {
            return null;
        }

        PrfPostComment prfPostComment = new PrfPostComment();

        prfPostComment.setId( prfPostCommentPatchDto.getId() );
        prfPostComment.setContent( prfPostCommentPatchDto.getContent() );

        return prfPostComment;
    }

    @Override
    public PrfPostCommentResponseDto prfPostCommentToPrfPostCommentResponseDto(PrfPostComment prfPostComment) {
        if ( prfPostComment == null ) {
            return null;
        }

        PrfPostCommentResponseDto.PrfPostCommentResponseDtoBuilder prfPostCommentResponseDto = PrfPostCommentResponseDto.builder();

        prfPostCommentResponseDto.id( prfPostComment.getId() );
        prfPostCommentResponseDto.content( prfPostComment.getContent() );

        return prfPostCommentResponseDto.build();
    }

    @Override
    public List<PrfPostCommentResponseDto> prfPostCommentToPrfPostCommentResponseDtos(List<PrfPostComment> prfPostComments) {
        if ( prfPostComments == null ) {
            return null;
        }

        List<PrfPostCommentResponseDto> list = new ArrayList<PrfPostCommentResponseDto>( prfPostComments.size() );
        for ( PrfPostComment prfPostComment : prfPostComments ) {
            list.add( prfPostCommentToPrfPostCommentResponseDto( prfPostComment ) );
        }

        return list;
    }
}
