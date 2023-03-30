package com.seb006.server.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seb006.server.global.audit.Auditable;
import com.seb006.server.like.entity.PrfPostLike;
import com.seb006.server.participation.entity.Participation;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.recruitpost.entity.RecruitPost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Member extends Auditable implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Override
    public String getName() {
        return getEmail();
    }

    public enum MemberStatus {
        ACTIVE("활동중"),
        QUIT("탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<PrfPost> prfPosts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<RecruitPost> recruitPosts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<PrfPostLike> prfPostLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Participation> participationList = new ArrayList<>();

    public void setPrfPosts(PrfPost prfPost) {
        this.prfPosts.add(prfPost);
        if (prfPost.getMember() != this) {
            prfPost.setMember(this);
        }
    }

    public void setRecruitPosts(RecruitPost recruitPost) {
        this.recruitPosts.add(recruitPost);
        if (recruitPost.getMember() != this) {
            recruitPost.setMember(this);
        }
    }

    public void setPrfPostLikes(PrfPostLike prfPostLike) {
        this.prfPostLikes.add(prfPostLike);
        if (prfPostLike.getMember() != this) {
            prfPostLike.setMember(this);
        }
    }

    public void setParticipationList(Participation participation) {
        this.participationList.add(participation);
        if (participation.getMember() != this) {
            participation.setMember(this);
        }
    }
}
