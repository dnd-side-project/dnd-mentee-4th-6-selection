package com.selection.security.token;

import com.selection.config.AppProperties;
import com.selection.security.oauth.AuthProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    private final AppProperties appProperties;

    private String getTokenSecret() {
        return appProperties.getAuth().getTokenSecret();
    }

    @SuppressWarnings("unchecked")
    public String createToken(Authentication authentication) {
        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(
            now.getTime() + appProperties.getAuth().getTokenExpirationMsec()
        );

        String email;
        AuthProvider authProvider = (AuthProvider) defaultOAuth2User.getAttributes()
            .get("social_type");

        if (authProvider == AuthProvider.KAKAO) {
            email = (String) ((Map<String, Object>) defaultOAuth2User.getAttributes()
                .get("kakao_account")).get("email");
        } else {
            email = (String) defaultOAuth2User.getAttributes().get("email");
        }

        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS512, getTokenSecret())
            .compact();
    }

    public String getEmailFromToken(String jwtToken) {
        Claims claims = Jwts.parser()
            .setSigningKey(getTokenSecret())
            .parseClaimsJws(jwtToken)
            .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jwts.parser().setSigningKey(getTokenSecret()).parseClaimsJws(jwtToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("해당 토큰({})는 유효하지 않은 JWT 시그니처입니다.", jwtToken);
        } catch (MalformedJwtException ex) {
            logger.error("해당 토큰({})는 유효하지 않은 JWT 토큰입니다.", jwtToken);
        } catch (ExpiredJwtException ex) {
            logger.error("해당 토큰({})은 만료된 JWT 토큰입니다.", jwtToken);
        } catch (UnsupportedJwtException ex) {
            logger.error("해당 토큰({})는 지원하지 않는 형식의 JWT 토큰입니다.", jwtToken);
        } catch (IllegalArgumentException ex) {
            logger.error("해당 토큰({})의 claims 정보가 존재하지 않습니다.", jwtToken);
        }
        return false;
    }
}