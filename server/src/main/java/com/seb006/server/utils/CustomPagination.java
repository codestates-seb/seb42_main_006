package com.seb006.server.utils;

import lombok.NoArgsConstructor;
import org.springframework.data.domain.*;

import java.util.List;

@NoArgsConstructor
public class CustomPagination<T> {
    private List<T> data;
    private int page;
    private int size;

    public Page<T> pagination(List<T> data, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), data.size());

        return new PageImpl<>(data.subList(start, end), pageable, data.size());
    }
}
