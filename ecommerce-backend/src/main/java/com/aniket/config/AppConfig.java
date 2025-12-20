package com.aniket.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // ✅ ENABLE CORS FIRST
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ✅ DISABLE CSRF
                .csrf(csrf -> csrf.disable())

                // ✅ STATELESS SESSION
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // ✅ AUTHORIZATION RULES
                .authorizeHttpRequests(auth -> auth

                        // ✅ ALLOW PREFLIGHT REQUESTS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ PUBLIC ENDPOINTS
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/category/**").permitAll()

                        // 🔒 PROTECTED ENDPOINTS
                        .requestMatchers("/api/admin/**").authenticated()
                        .requestMatchers("/api/**").authenticated()

                        .anyRequest().permitAll()
                )

                // ✅ JWT FILTER MUST RUN AFTER CORS
                .addFilterAfter(new JwtValidator(), BasicAuthenticationFilter.class);

        return http.build();
    }

    // ✅ GLOBAL CORS CONFIGURATION
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        return (HttpServletRequest request) -> {

            CorsConfiguration cfg = new CorsConfiguration();

            cfg.setAllowCredentials(true);

            // ✅ IMPORTANT: use allowedOriginPatterns
            cfg.setAllowedOriginPatterns(List.of(
                    "http://localhost:5173",
                    "http://localhost:4200",
                    "https://aniketmuni-ecommerce.vercel.app"
            ));

            cfg.setAllowedMethods(List.of(
                    "GET", "POST", "PUT", "DELETE", "OPTIONS"
            ));

            cfg.setAllowedHeaders(List.of("*"));
            cfg.setExposedHeaders(List.of("Authorization"));
            cfg.setMaxAge(3600L);

            return cfg;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
