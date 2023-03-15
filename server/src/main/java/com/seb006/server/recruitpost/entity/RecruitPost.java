package com.seb006.server.recruitpost.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
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
public class RecruitPost extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    private String content;

    private int recruitNumber;

    private int currentNumber;


    //모집기간
    //private long startTimeMill;
    // long endTimeMill;

    //모집기간
    private String dueDate;

    @Column(nullable = false)
    private String tags;

    private String age;

    //회원 <-> 모집글
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "member_id")
    private Member member;

    //게시글<->모집글
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "prf_post_id")
    private PrfPost prfPost;

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
