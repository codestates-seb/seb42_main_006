package com.seb006.server.prfpostcomment.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PrfPostComment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    //멤버 연관관계 매핑
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "member_id")
    private Member member;

    //게시글 연관관계 매핑
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "prf_post_id")
    private PrfPost prfPost;
}
