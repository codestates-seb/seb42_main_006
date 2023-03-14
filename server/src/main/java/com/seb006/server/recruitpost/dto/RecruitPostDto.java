package com.seb006.server.recruitpost.dto;

import com.seb006.server.prfpost.entity.PrfPost;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class RecruitPostDto {

    private Long prfPostId;

    //private Long memberId;
    //private String nickName;

    private String title;

    private String category;

    private String content;

    private int recruitNumber;

    //모집기간 수정 필요
    private String dueDate;

    private String age;

    private String tags;


}
