package com.ayoub.student.controller;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ayoub.student.Factory.Factory;
import com.ayoub.student.entity.AppRole;
import com.ayoub.student.entity.AppUser;
import com.ayoub.student.services.AccountServiceImpl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class AccountController {
    private AccountServiceImpl accountService;

    public AccountController(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }
    


    @GetMapping(Factory.PREFIX_URL_REFRESH)
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jwtHeader = request.getHeader(Factory.PREFIX_AUTHORIZATION);
        if(jwtHeader != null && jwtHeader.contains(Factory.PREFIX_BEARER)){
            try {
                String jwtTokenRefresh = jwtHeader.substring(7);
                Algorithm algorithm = Algorithm.HMAC256(Factory.SECRET);
                JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwtTokenRefresh);
                String email = decodedJWT.getSubject();
                AppUser appUser = accountService.findByUsername(email);

                String jwtAccessToken = JWT.create()
                        .withSubject(appUser.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + Factory.INITIAL_TIME))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim(Factory.PREFIX_CLAIMS_ROLES,appUser.getRoles().stream().map(AppRole::getNameRole).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String,String> token = new HashMap<>();
                token.put(Factory.PREFIX_ACCESS_TOKEN,jwtAccessToken);
                token.put(Factory.PREFIX_REFRESH_TOKEN,jwtTokenRefresh);
                response.setContentType(Factory.PREFIX_TYPE_CONTENT);
                new ObjectMapper().writeValue(response.getOutputStream(),token);

            }catch (Exception e){
                response.setHeader(Factory.PREFIX_HEADER_ERREUR,e.getMessage());
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
            }

        }else{
            throw new RuntimeException("Refresh token required!!");
        }

    }
}
