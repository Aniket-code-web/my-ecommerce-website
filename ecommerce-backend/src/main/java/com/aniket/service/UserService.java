package com.aniket.service;

import com.aniket.exception.UserException;
import com.aniket.model.User;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

}
