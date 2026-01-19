package com.aniket.service;

import com.aniket.config.JwtProvider;
import com.aniket.exception.UserException;
import com.aniket.model.User;
import com.aniket.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public UserServiceImplementation(UserRepository userRepository,
                                     JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserException("User not found with id " + userId));
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {

        if (jwt == null || !jwt.startsWith("Bearer ")) {
            throw new UserException("Invalid or missing JWT");
        }

        String token = jwt.substring(7); // remove Bearer
        String email = jwtProvider.getEmailFromToken(token);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email " + email);
        }

        return user;
    }
}
