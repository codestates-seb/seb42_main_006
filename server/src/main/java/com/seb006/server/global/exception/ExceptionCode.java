package com.seb006.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "조회하는 회원이 존재하지 않습니다."),
    MEMBER_EMAIL_EXISTS(409, "이미 등록된 이메일입니다."),
    MEMBER_NICKNAME_EXISTS(409, "이미 등록된 닉네임입니다."),
    MEMBER_QUIT(404, "탈퇴한 회원입니다."),

    PRFPOST_NOT_FOUND(404, "해당 게시글이 존재하지 않습니다."),
    PRFPOSTLIKE_NOT_FOUND(404, "해당 게시글에 좋아요를 하지 않았습니다."),
    PRFPOSTLIKE_EXISTS(409, "이미 좋아요한 게시글입니다."),
    RECRUITPOSTLIKE_EXISTS(409, "이미 좋아요한 모집글입니다."),

    RECRUITPOST_NOT_FOUND(404, "모집글이 존재하지 않습니다."),

    RECRUITPOST_CLOSED(404,"모집을 중지합니다."),

    PRFPOSTCOMMENT_NOT_FOUND(404,"게시글 댓글이 존재하지 않습니다."),

    RECRUITPOSTCOMMENT_NOT_FOUND(404,"모집글 댓글이 존재하지 않습니다."),

    PARTICIPATIOM_EXISTS(409, "이미 참여한 모집글 입니다."),

    PARTICIPATION_FULL(404,"모집정원이 마감되었습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
