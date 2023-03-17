package com.seb006.server.recruitpost.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import com.seb006.server.recruitpostcomment.entity.RecruitPostComment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@DynamicUpdate
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

    @Range(max= 10)
    private int recruitNumber;

    @Range(max= 10)
    private Integer currentNumber = 0;


    //모집기간
    //private long startTimeMill;
    // long endTimeMill;

    //모집기간
    private String dueDate;

    @Column(nullable = false)
    private String tags;

    private String age;

    @Column(nullable = false)
    private Integer likeCount = 0;

    //회원 <-> 모집글
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "member_id")
    private Member member;

    //게시글<->모집글
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "prf_post_id")
    private PrfPost prfPost;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private RecruitStatus recruitStatus = RecruitStatus.ACTIVE;

    public enum RecruitStatus {

        ACTIVE(1,"모집 중"),
        CLOSE(2,"모집글 닫기"),
        EXPIRED(3,"모집 실패");

        @Getter
        public int statusNumber;

        @Getter
        public String statusDescription;

        RecruitStatus(int statusNumber, String statusDescription) {
            this.statusNumber = statusNumber;
            this.statusDescription = statusDescription;
        }
    }

    @OneToMany(mappedBy = "recruitPost", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<RecruitPostComment> comments = new ArrayList<>();

    public void likeCountUp() {
        this.likeCount++;
    }
    public void likeCountDown() {
        this.likeCount--;
    }

    public void currentNumberUp(){
        this.currentNumber++;
    }

}
