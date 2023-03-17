package com.seb006.server.prfpost;

import com.seb006.server.member.entity.Member;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.prfpost.repository.PrfPostRepository;
import com.seb006.server.url.entity.Urls;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PrfPostTest {
    @Autowired
    private PrfPostRepository prfPostRepository;

    @AfterAll()
    public void cleanAll() {
        prfPostRepository.deleteAll();
    }


    @BeforeAll
    public void setup() {
        Member member = new Member();
        for(int i=0;i<10;i++){

            PrfPost prfPost = new PrfPost();
            prfPost.setTitle("제목"+i);
            prfPost.setCategory("영화");
            prfPost.setContent("내용"+i);
            prfPost.setTags("#태그");

            for(int j=0;j<5;j++){

            }


        }


    }

    @Test
    public void test(){
        // given
        // when
        // then
    }
}
