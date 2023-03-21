package com.seb006.server.auth.redis.repository;

import com.seb006.server.auth.redis.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
