package com.slightlyworse.swifthub.controller;

import com.slightlyworse.swifthub.dto.UserDto;
import com.slightlyworse.swifthub.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Fake auth for the hackathon: the "current user" is whoever the frontend's user
 * switcher selects, sent as the X-User-Id header. No passwords, no sessions.
 * Served at /api/me (global prefix from WebConfig).
 */
@RestController
@RequestMapping("/me")
public class MeController {

    private final UserService userService;

    public MeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto me(@RequestHeader(value = "X-User-Id", required = false) Long userId) {
        return userService.getCurrentUser(userId);
    }
}
