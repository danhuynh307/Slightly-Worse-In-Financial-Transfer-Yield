package com.slightlyworse.swifthub.dto;

import com.slightlyworse.swifthub.entity.User;

/**
 * Response shape for a user. Entities never leave the service layer — controllers
 * return DTOs so we don't accidentally expose internal fields or trigger lazy-load
 * serialization bugs.
 */
public record UserDto(
        Long id,
        String name,
        String title,
        String team,
        String bio,
        String photoUrl
) {
    public static UserDto from(User u) {
        return new UserDto(u.getId(), u.getName(), u.getTitle(), u.getTeam(), u.getBio(), u.getPhotoUrl());
    }
}
