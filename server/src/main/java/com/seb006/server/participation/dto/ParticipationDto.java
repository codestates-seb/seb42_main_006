package com.seb006.server.participation.dto;

import com.seb006.server.member.entity.Member;
import com.seb006.server.recruitpost.entity.RecruitPost;
import lombok.*;

import java.time.LocalDateTime;


public class ParticipationDto {
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Setter
    @Getter
    public static class Response{
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

        public void setMember(Member member){

            this.nickName= member.getNickName();
            this.memberId = member.getId();
        }
        public Response(int currentNumber) {
            this.currentNumber = currentNumber;
        }
    }

}
