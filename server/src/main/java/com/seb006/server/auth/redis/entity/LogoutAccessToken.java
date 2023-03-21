package com.seb006.server.auth.redis.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Getter
@AllArgsConstructor
@RedisHash(value = "logoutAccessToken", timeToLive = 60)
public class LogoutAccessToken {
    @Id
    private String email;

    private String accessToken;
}
