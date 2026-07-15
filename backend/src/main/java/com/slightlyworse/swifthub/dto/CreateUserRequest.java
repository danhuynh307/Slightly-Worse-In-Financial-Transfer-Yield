package com.slightlyworse.swifthub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request body for creating a user. Bean Validation annotations are enforced by
 * @Valid in the controller; failures are turned into 400s by GlobalExceptionHandler.
 */
public record CreateUserRequest(
        @NotBlank(message = "name is required") String name,
        @NotBlank(message = "title is required") String title,
        @NotBlank(message = "team is required") String team,
        @Size(max = 1000, message = "bio must be at most 1000 characters") String bio,
        String photoUrl
) {
}
