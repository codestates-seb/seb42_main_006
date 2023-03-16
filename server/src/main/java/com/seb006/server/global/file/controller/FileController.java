package com.seb006.server.global.file.controller;

import com.seb006.server.global.file.dto.FileDto;
import com.seb006.server.global.file.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity saveImage(@RequestParam(value = "image") MultipartFile image) throws IOException {

        String imageUrl = fileService.upload(image, "images");
        FileDto.Response response = new FileDto.Response(imageUrl);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/images/upd", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity updateImage(@RequestParam(value = "fileKey") String fileKey,
                                      @RequestParam(value = "image") MultipartFile image) throws IOException {
        // 삭제할 파일이름을 전달받아 삭제
        fileService.remove(fileKey);

        // 새 이미지 업로드
        String imageUrl = fileService.upload(image, "images");
        FileDto.Response response = new FileDto.Response(imageUrl);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(value = "/images/del", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity deleteImage(@RequestParam(value = "fileKey") String fileKey) {
        fileService.remove(fileKey);

        return ResponseEntity.noContent().build();
    }
}
