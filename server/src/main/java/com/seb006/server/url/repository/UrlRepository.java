package com.seb006.server.url.repository;

import com.seb006.server.url.entity.Urls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UrlRepository extends JpaRepository<Urls, Long> {
    @Modifying
    @Transactional
    @Query("delete from Urls u where u.prfPost.id = :postId")
    void deleteUrlsByPrfPostId(long postId);
}
