package com.seb006.server.global.file.dto;

public class FileDto {
    public static class Response {
        private String fileKey;

        public Response(String fileKey) {
            this.fileKey = fileKey;
        }

        public String getFileKey() {
            return fileKey;
        }
    }
}
