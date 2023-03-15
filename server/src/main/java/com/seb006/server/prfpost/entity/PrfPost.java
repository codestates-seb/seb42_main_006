package com.seb006.server.prfpost.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpostcomment.entity.PrfPostComment;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.url.entity.Urls;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PrfPost extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String tags;

    // urls를 Set으로 해야할까? 아니면 중복이 불가능하게 validation을 설정해야할까 고민
    @OneToMany(mappedBy = "prfPost", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<Urls> urls = new ArrayList<>();

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "prfPost", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<PrfPostComment> comments = new ArrayList<>();
    

}
