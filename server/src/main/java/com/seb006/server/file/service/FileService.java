package com.seb006.server.file.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {
    private final S3Uploader s3Uploader;

    public FileService(S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
    }

    public String saveImage(MultipartFile image) throws IOException {
        String imageUrl = s3Uploader.upload(image, "images");

        return imageUrl;
    }
}
