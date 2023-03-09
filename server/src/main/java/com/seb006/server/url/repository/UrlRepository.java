package com.seb006.server.url.repository;

import com.seb006.server.url.entity.Urls;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlRepository extends JpaRepository<Urls, Long> {

}
