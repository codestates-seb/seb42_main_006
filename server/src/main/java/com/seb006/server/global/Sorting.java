package com.seb006.server.global;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Sorting {
    public List<Sort.Order> getOrders(int sorting){
        List<Sort.Order> orders = new ArrayList<Sort.Order>();

        if(sorting == 2){
            orders.add(new Sort.Order(Sort.Direction.DESC, "likeCount"));
        }
        orders.add(new Sort.Order(Sort.Direction.DESC, "id"));
        return orders;
    }
}
