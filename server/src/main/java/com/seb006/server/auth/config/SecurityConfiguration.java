package com.seb006.server.auth.config;

import com.seb006.server.auth.filter.JwtAuthenticationFilter;
import com.seb006.server.auth.filter.JwtVerificationFilter;
import com.seb006.server.auth.handler.MemberAccessDeniedHandler;
import com.seb006.server.auth.handler.MemberAuthenticationEntryPoint;
import com.seb006.server.auth.handler.MemberAuthenticationFailureHandler;
import com.seb006.server.auth.handler.MemberAuthenticationSuccessHandler;
import com.seb006.server.auth.jwt.JwtTokenizer;
import com.seb006.server.auth.redis.repository.LogoutAccessTokenRedisRepository;
import com.seb006.server.auth.redis.repository.RefreshTokenRepository;
import com.seb006.server.auth.userdetails.CustomUserDetailsService;
import com.seb006.server.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 RefreshTokenRepository refreshTokenRepository,
                                 CustomUserDetailsService customUserDetailsService,
                                 LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.refreshTokenRepository = refreshTokenRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.logoutAccessTokenRedisRepository = logoutAccessTokenRedisRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/members/mypage").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/members/edit/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/members/logout").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/reissue").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/prf-posts").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/prf-posts/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/prf-posts/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/prf-comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/prf-comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/prf-comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/recruit-posts").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/recruit-posts/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/recruit-posts/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/recruit-posts/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/recruit-comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/recruit-comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/recruit-comments/**").hasRole("USER")
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenRepository);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter =
                    new JwtVerificationFilter(jwtTokenizer, authorityUtils,
                            customUserDetailsService, logoutAccessTokenRedisRepository);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
