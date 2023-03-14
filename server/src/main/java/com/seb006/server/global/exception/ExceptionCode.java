package com.seb006.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "조회하는 회원이 존재하지 않습니다."),
    MEMBER_EMAIL_EXISTS(409, "이미 등록된 이메일입니다."),
    MEMBER_NICKNAME_EXISTS(409, "이미 등록된 닉네임입니다."),
    PRFPOST_NOT_FOUND(404, "해당 게시글이 존재하지 않습니다."),
    PRFPOSTLIKE_NOT_FOUND(404, "해당 게시글에 좋아요를 하지 않았습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
