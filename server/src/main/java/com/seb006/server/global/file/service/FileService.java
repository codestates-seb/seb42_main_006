package com.seb006.server.global.file.service;

import com.seb006.server.global.file.utils.FileUploader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {
    private final FileUploader fileUploader;

    public FileService(FileUploader fileUploader) {
        this.fileUploader = fileUploader;
    }

    public String saveImage(MultipartFile image) throws IOException {
        String imageUrl = fileUploader.upload(image, "images");

        return imageUrl;
    }
}
