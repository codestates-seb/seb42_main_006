package com.seb006.server.auth.filter;

import com.seb006.server.auth.jwt.JwtTokenizer;
import com.seb006.server.auth.redis.entity.LogoutAccessToken;
import com.seb006.server.auth.redis.repository.LogoutAccessTokenRedisRepository;
import com.seb006.server.auth.userdetails.CustomUserDetailsService;
import com.seb006.server.auth.utils.CustomAuthorityUtils;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CustomUserDetailsService customUserDetailsService;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 CustomUserDetailsService customUserDetailsService,
                                 LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.customUserDetailsService = customUserDetailsService;
        this.logoutAccessTokenRedisRepository = logoutAccessTokenRedisRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            String username = (String) claims.get("username");

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            setAuthenticationToContext(userDetails);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (DisabledException de) {
            request.setAttribute("exception", de);
        }catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        // 만약 입력받은 액세스 토큰이 블랙리스트에 등록되어 있다면 exception
        checkBlackList(jws);

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // @AuthenticationPrincipal
    private void setAuthenticationToContext(UserDetails userDetails) {
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(userDetails.getAuthorities().toString());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    // Principal
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void checkBlackList(String jws) {
        Optional<LogoutAccessToken> optionalLogoutAccessToken = logoutAccessTokenRedisRepository.findById(jws);
        if (optionalLogoutAccessToken.isPresent())
            throw new BusinessLogicException(ExceptionCode.LOGOUT_AUTHORIZATION);
    }
}
