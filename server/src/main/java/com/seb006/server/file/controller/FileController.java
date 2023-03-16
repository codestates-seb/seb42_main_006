package com.seb006.server.file.controller;

import com.seb006.server.file.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/upload")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String saveImage(@RequestParam(value = "image") MultipartFile image) throws IOException {

        return fileService.saveImage(image);
    }

    @PostMapping(value = "/edit/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String updateImage(@RequestParam(value = "image") MultipartFile image) throws IOException {
        // 1. 삭제할 파일이름을 전달받아 삭제하고 새 이미지 업로드
        // 2. 저장할 때 부터 경로를 유일하게 설정하여 기존 파일 없애고 삭제

        return "";
    }
}
