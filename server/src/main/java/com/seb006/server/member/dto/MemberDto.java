package com.seb006.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String email;

        private String password;

        private String nickName;
    }

    public static class Email {
        private String email;

        public String getEmail() {
            return email;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;

        private String email;

        private String nickName;
    }
}
