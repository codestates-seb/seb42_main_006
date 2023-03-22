package com.seb006.server.auth.service;

import com.seb006.server.auth.jwt.JwtTokenizer;
import com.seb006.server.auth.redis.entity.RefreshToken;
import com.seb006.server.auth.redis.repository.RefreshTokenRepository;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    public AuthService(JwtTokenizer jwtTokenizer,
                       RefreshTokenRepository refreshTokenRepository,
                       MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.refreshTokenRepository = refreshTokenRepository;
        this.memberRepository = memberRepository;
    }

    public Map<String, String> reissue(String email, String refreshToken) {
        // 토큰 유효 기간 검사
        Boolean isValidDate = jwtTokenizer.isValidDateToken(refreshToken);

        // 유효한 회원인지 검사
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 레디스 토큰 조회
        RefreshToken redisRefreshToken = refreshTokenRepository.findById(email)
                .orElseThrow(() -> new NoSuchElementException("해당하는 토큰이 존재하지 않습니다."));      // TODO: 예외 처리 수정

        // 전달받은 토큰과 레디스에서 조회한 토큰 일치하는지 검사
        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            Map<String, String> token = new HashMap<>();
            token.put("accessToken", jwtTokenizer.generateAccessToken(member));
            token.put("refreshToken", jwtTokenizer.generateRefreshToken(member.getEmail()));

            // 새로 생성한 refreshToken 으로 교체
            redisRefreshToken.setRefreshToken(token.get("refreshToken"));
            refreshTokenRepository.save(redisRefreshToken);

            return token;
        } else {
            throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
        }
    }
}
