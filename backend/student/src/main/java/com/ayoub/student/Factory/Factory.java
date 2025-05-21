package com.ayoub.student.Factory;

public interface Factory {
    final String SECRET = "raja1949";
    final String PREFIX_USERNAME = "email";
    final String PREFIX_PASSWORD = "password";
    final String PREFIX_ACCESS_TOKEN = "access-token";
    final String PREFIX_REFRESH_TOKEN = "refresh-token";
    final String PREFIX_TYPE_CONTENT = "application/json";
    final String PREFIX_CLAIMS_ROLES = "roles";
    final String PREFIX_URL_REFRESH = "/RefreshToken";
    final String PREFIX_AUTHORIZATION = "Authorization";
    final String PREFIX_BEARER="Bearer ";
    final String PREFIX_HEADER_ERREUR = "erreur-message";
    final int INITIAL_TIME = 20*60*1000;
    final int REFRESH_TIME = 60*60*1000;


}
