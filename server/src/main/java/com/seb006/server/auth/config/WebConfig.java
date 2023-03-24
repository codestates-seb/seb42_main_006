package com.seb006.server.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/reissue")
                .allowedOrigins("http://localhost:3000")
                .exposedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
