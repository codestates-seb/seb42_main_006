package com.seb006.server.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$",
                message = "이메일 형식에 맞지 않습니다.")
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$",
                message = "비밀번호는 숫자, 문자를 포함하여 8~20자리여야 합니다.")
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String nickName;
    }

    public static class Email {
        @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$",
                message = "이메일 형식에 맞지 않습니다.")
        private String email;

        public String getEmail() {
            return email;
        }
    }

    @Getter
    public static class Patch {
        private String email;
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$",
                message = "비밀번호는 숫자, 문자를 포함하여 8~20자리여야 합니다.")
        private String password;

        private String nickName;

        public void setEmail(String email) {
            this.email = email;
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long id;

        private String email;

        private String nickName;

        private String memberStatus;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime modifiedAt;
    }
}
