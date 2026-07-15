package com.slightlyworse.swifthub.service;

import com.slightlyworse.swifthub.dto.CreateUserRequest;
import com.slightlyworse.swifthub.dto.UserDto;
import com.slightlyworse.swifthub.entity.User;
import com.slightlyworse.swifthub.exception.NotFoundException;
import com.slightlyworse.swifthub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business logic for users. This is the reference service — copy this shape for
 * each new feature (ExpertiseService, PromptService, ...).
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(UserDto::from).toList();
    }

    public UserDto findById(Long id) {
        return userRepository.findById(id)
                .map(UserDto::from)
                .orElseThrow(() -> new NotFoundException("User " + id + " not found"));
    }

    public UserDto create(CreateUserRequest req) {
        User user = new User(null, req.name(), req.title(), req.team(), req.bio(), req.photoUrl());
        return UserDto.from(userRepository.save(user));
    }

    /**
     * Fake-auth "current user": if an X-User-Id was supplied, use it; otherwise
     * fall back to the first user so the app always has a signed-in identity.
     */
    public UserDto getCurrentUser(Long userId) {
        if (userId != null) {
            return findById(userId);
        }
        return userRepository.findAll().stream()
                .findFirst()
                .map(UserDto::from)
                .orElseThrow(() -> new NotFoundException("No users exist to sign in as"));
    }
}
