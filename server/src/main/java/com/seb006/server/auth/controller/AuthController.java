package com.seb006.server.auth.controller;

import com.seb006.server.auth.service.AuthService;
import com.seb006.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/reissue")
    public ResponseEntity reissue(@RequestHeader("RefreshToken") String refreshToken,
                                  @RequestHeader("email") String email,
                                  HttpServletResponse response) {
        Map<String, String> token = authService.reissue(email, refreshToken);

        response.setHeader("Authorization", "Bearer " + token.get("accessToken"));
        response.setHeader("Refresh", token.get("refreshToken"));

        return ResponseEntity.ok().build();
    }

    @PostMapping("/members/logout")
    public ResponseEntity logout(@AuthenticationPrincipal Member member,
                                 @RequestHeader("Authorization") String accessToken) {
        authService.logout(member, accessToken);
        log.info("Logout : " + member.getEmail());

        return ResponseEntity.ok().build();
    }
}
