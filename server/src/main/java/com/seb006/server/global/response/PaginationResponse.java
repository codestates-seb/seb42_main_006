package com.seb006.server.global.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PaginationResponse<T> {
    private final List<T> data;
    private final PageInfo pageInfo;

    public PaginationResponse(List<T> data, Page page){
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
