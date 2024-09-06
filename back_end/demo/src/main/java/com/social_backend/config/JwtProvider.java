package com.social_backend.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    // Secret key used for signing the JWT. This key should be kept secure.
    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Method to generate a JWT based on the provided Authentication object.
    public static String generateToken(Authentication auth) {

        // Create a JWT builder to construct the token.
        String jwt = Jwts.builder()
                // Set the issuer of the token. Typically, this is your application or service
                // name.
                .setIssuer("dev")
                // Set the issuance date of the token.
                .setIssuedAt(new Date())
                // Set the expiration date of the token. Here, it's set to 24 hours from the
                // current time.
                .setExpiration(new Date(new Date().getTime() + 86400000))
                // Add a custom claim to the token. In this case, the user's email.
                .claim("email", auth.getName())
                // Sign the token with the secret key.
                .signWith(key)
                // Build the token and convert it to a compact, URL-safe string representation.
                .compact();

        // Return the generated JWT.
        return jwt;
    }

    // Extract the email
    public static String getEmailFromJwtToken(String jwt) {
        // How will jwt look like => Bearer token => I must skip "Bearer_" letters so i
        // can get the actual token
        jwt = jwt.substring(7);
        // Create a JwtParserBuilder instance to configure and build a JwtParser.
        Claims claims = Jwts.parserBuilder()
                // Set the signing key used to verify the JWT's signature.
                .setSigningKey(key)
                // Build the JwtParser instance with the specified configuration.
                .build()
                // Parse the JWT string (jwt) and verify its signature.
                // This returns a Jws<Claims> object that includes the header, body (claims),
                // and signature.
                .parseClaimsJws(jwt)
                // Extract the body from the Jws<Claims> object, which contains the claims.
                // This is the payload of the JWT where the actual data is stored.
                .getBody();

        String email = String.valueOf(claims.get("email"));
        return email;

    }
}
