package com.seb006.server.recruitpost.dto;

import com.seb006.server.recruitpost.entity.RecruitPost;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruitPostResponseDto {

    private Long id;

    private String title;

    private String category;

    private String content;

    private int recruitNumber;

    private int currentNumber;

    private RecruitPost.RecruitStatus recruitStatus;

    private LocalDate dueDate;

    private String age;

    private String tags;

}
