package com.seb006.server.auth.controller;

import com.seb006.server.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

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
}
