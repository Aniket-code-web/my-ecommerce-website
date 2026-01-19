package com.aniket.controller;

import com.aniket.config.JwtProvider;
import com.aniket.exception.UserException;
import com.aniket.model.Cart;
import com.aniket.model.User;
import com.aniket.repository.UserRepository;
import com.aniket.request.LoginRequest;
import com.aniket.response.AuthResponse;
import com.aniket.service.CartService;
import com.aniket.service.CustomeUserServiceImplementation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomeUserServiceImplementation customeUserService;
    private final CartService cartService;

    public AuthController(
            UserRepository userRepository,
            CustomeUserServiceImplementation customeUserService,
            PasswordEncoder passwordEncoder,
            JwtProvider jwtProvider,
            CartService cartService
    ) {
        this.userRepository = userRepository;
        this.customeUserService = customeUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user)
            throws UserException {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new UserException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        Cart cart = cartService.createCart(savedUser);

        UserDetails userDetails =
                customeUserService.loadUserByUsername(savedUser.getEmail());

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        return new ResponseEntity<>(
                new AuthResponse(token, "Signup Success"),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(
            @RequestBody LoginRequest loginRequest
    ) {

        Authentication authentication =
                authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        return new ResponseEntity<>(
                new AuthResponse(token, "Signin Success"),
                HttpStatus.OK
        );
    }

    private Authentication authenticate(String email, String password) {

        UserDetails userDetails =
                customeUserService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid email");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }
}
