package com.seb006.server.auth.userdetails;

import com.seb006.server.auth.utils.CustomAuthorityUtils;
import com.seb006.server.global.exception.BusinessLogicException;
import com.seb006.server.global.exception.ExceptionCode;
import com.seb006.server.member.entity.Member;
import com.seb006.server.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public CustomUserDetailsService(MemberRepository memberRepository,
                                    CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember  = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new CustomUserDetails(findMember);
    }

    private final class CustomUserDetails extends Member implements UserDetails {
        CustomUserDetails(Member member) {
            setId(member.getId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setNickName(member.getNickName());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
