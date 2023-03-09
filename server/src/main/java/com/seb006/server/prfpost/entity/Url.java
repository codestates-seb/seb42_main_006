package com.seb006.server.prfpost.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String url;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "prf_post_id")
    private PrfPost prfPost;
}
