package ru.ifmo.se.web4lab.utils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Date;

public class TokenUtil {
    private static final String SECRET = "SecretKey";  // Храните секретный ключ безопасно

    public static String generateToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600 * 1000))  // 1 час
                .sign(algorithm);
    }
    public static String getUsernameFromToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);  // Проверка токена
        return decodedJWT.getSubject();  // Извлекаем subject (имя пользователя)
    }
}
