package com.seb006.server.config;

import com.seb006.server.member.entity.Member;
import com.seb006.server.recruitpost.entity.RecruitPost;
import com.seb006.server.recruitpost.repository.RecruitPostRepository;
import com.seb006.server.recruitpost.service.RecruitPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private RecruitPostRepository recruitPostRepository;

    @Autowired
    private RecruitPostService recruitPostService;

    @Bean
    public Job job(){
        Job job = jobBuilderFactory.get("job")
                .start(step())
                .build();
        return job;
    }

    @Bean
    public Job job2(){
        Job job = jobBuilderFactory.get("job")
                .start(step2())
                .build();
        return job;
    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                    log.info("step!");

                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime day = now.minusDays(7);
                    List<RecruitPost> recruitPostList = recruitPostRepository.findByModifiedAtLessThan(day);

                    if(recruitPostList.size() > 0 && recruitPostList != null){
                        for (RecruitPost recruitPost : recruitPostList) {

                            recruitPostService.expiredRecruitPost(recruitPost.getId());

                        }
                    }
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
    @Bean
    public Step step2() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                    log.info("step!");

                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime day = now.minusDays(7);
                    List<RecruitPost> recruitPostList = recruitPostRepository.findByModifiedAtLessThan(day);

                    if(recruitPostList.size() > 0 && recruitPostList != null){
                        for (RecruitPost recruitPost : recruitPostList) {

                            recruitPostService.dbExpiredRecruitPost(recruitPost.getId());

                        }
                    }
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
