
package com.social_backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {
	/**
	 * Configures the security settings for the application.
	 * 
	 * This method defines the session management policy, authorization rules, and
	 * disables CSRF protection.
	 * 
	 * @param http the HttpSecurity object used to configure security settings
	 * @return the configured SecurityFilterChain object
	 * @throws Exception if an error occurs during configuration
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// Set session management to stateless; no session state is stored on the
		// server.
		http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				// Configure authorization rules
				.authorizeHttpRequests(authorize -> authorize
						// Require authentication for any requests that match the /api/** pattern
						.requestMatchers("/api/**").authenticated()
						// Allow all other requests without authentication
						.anyRequest().permitAll())
				.addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
				// Disable Cross-Site Request Forgery (CSRF) protection
				.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(corsConfigSource()));

		// Build and return the configured SecurityFilterChain
		return http.build();
	}

	private CorsConfigurationSource corsConfigSource() {
		return new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration config = new CorsConfiguration();
				config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
				config.setAllowedMethods(Collections.singletonList("*"));
				config.setAllowCredentials(true);
				config.setAllowedHeaders(Collections.singletonList("*"));
				config.setExposedHeaders(Arrays.asList("Authorization"));
				config.setMaxAge(3600L);
				return config;
			}
		};
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}