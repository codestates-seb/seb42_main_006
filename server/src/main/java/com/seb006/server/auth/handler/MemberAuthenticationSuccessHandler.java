package com.seb006.server.auth.handler;

import com.google.gson.Gson;
import com.seb006.server.auth.dto.LoginResponseDto;
import com.seb006.server.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("# id: {}, Authenticated successfully", authentication.getName());

        sendSuccessResponse(response, authentication);

    }

    private static void sendSuccessResponse(HttpServletResponse response, Authentication authentication) throws IOException {
        Gson gson = new Gson();
        Member member = (Member) authentication.getPrincipal();
        LoginResponseDto responseDto = new LoginResponseDto(member.getId(), member.getEmail(), member.getNickName());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(gson.toJson(responseDto));
    }
}
