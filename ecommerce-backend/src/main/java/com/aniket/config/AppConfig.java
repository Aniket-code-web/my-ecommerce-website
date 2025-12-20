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
                // ✅ CORS MUST COME FIRST
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // ✅ Allow preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ Public APIs
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/category/**").permitAll()

                        // 🔒 Protected APIs
                        .requestMatchers("/api/admin/**").authenticated()
                        .requestMatchers("/api/**").authenticated()

                        .anyRequest().permitAll()
                )

                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class);

        return http.build();
    }

    // ✅ GLOBAL CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        return (HttpServletRequest request) -> {

            CorsConfiguration cfg = new CorsConfiguration();

            // ✅ Use allowedOriginPatterns (NOT allowedOrigins)
            cfg.setAllowedOriginPatterns(List.of(
                    "http://localhost:5173",
                    "http://localhost:4200",
                    "https://aniketmuni-ecommerce.vercel.app"
            ));

            cfg.setAllowedMethods(List.of(
                    "GET", "POST", "PUT", "DELETE", "OPTIONS"
            ));

            cfg.setAllowedHeaders(List.of("*"));
            cfg.setAllowCredentials(true);

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
