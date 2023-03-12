package com.seb006.server.recruitpost.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class RecruitPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    private String content;

    private int recruitNumber;

    private int currentNumber;

    //모집기간
    private LocalDate dueDate;

    private String tags;

    private String age;

    //회원<-> 모집글

    //게시글<->모집글

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RecruitStatus recruitStatus = RecruitStatus.ACTIVE;

    public enum RecruitStatus {

        ACTIVE(1,"모집 중"),
        EXPIRED(2,"모집 완료");

        @Getter
        public int statusNumber;

        @Getter
        public String statusDescription;

        RecruitStatus(int statusNumber, String statusDescription) {
            this.statusNumber = statusNumber;
            this.statusDescription = statusDescription;
        }
    }




}
