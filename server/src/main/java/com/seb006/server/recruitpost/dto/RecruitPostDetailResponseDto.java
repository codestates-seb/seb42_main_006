package com.seb006.server.recruitpost.dto;

import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpostcomment.dto.PrfPostCommentResponseDto;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpostcomment.dto.RecruitPostCommentResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruitPostDetailResponseDto {

    private Long id;

    private String title;

    private String category;

    private String content;

    private int recruitNumber;

    private int currentNumber;

    private RecruitPost.RecruitStatus recruitStatus;

    private String dueDate;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private long memberId;
    private String nickName;

    private String age;

    private String tags;

    private Integer likeCount;

    private List<RecruitPostCommentResponseDto> comments;



    public void setMember(Member member){

        this.nickName= member.getNickName();
        this.memberId = member.getId();
    }
}
