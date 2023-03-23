package com.seb006.server.participation.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.member.entity.Member;
import com.seb006.server.recruitpost.entity.RecruitPost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Participation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "recruit_post_id")
    private RecruitPost recruitPost;

    public Participation(Member member, RecruitPost recruitPost){
        this.member =member;
        this.recruitPost=recruitPost;
    }
}