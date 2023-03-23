package com.seb006.server.auth.redis.repository;

import com.seb006.server.auth.redis.entity.LogoutAccessToken;
import org.springframework.data.repository.CrudRepository;

public interface LogoutAccessTokenRedisRepository extends CrudRepository<LogoutAccessToken, String> {
}
