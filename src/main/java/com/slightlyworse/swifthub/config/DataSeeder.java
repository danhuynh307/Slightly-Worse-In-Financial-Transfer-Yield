package com.slightlyworse.swifthub.config;

import com.slightlyworse.swifthub.entity.User;
import com.slightlyworse.swifthub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Seeds a few fake users on startup so the app has data to show immediately.
 * Runs every boot because the dev DB is in-memory (create-drop).
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }
        userRepository.save(new User(null, "Dan", "Senior Engineer", "Platform",
                "Spring Boot enjoyer. Ask me about JPA and CI/CD.", null));
        userRepository.save(new User(null, "Russell", "DevOps Engineer", "Infra",
                "Docker, Kubernetes, and making pipelines less scary.", null));
        userRepository.save(new User(null, "Sarah", "Frontend Engineer", "Web",
                "React, TypeScript, and pixel-perfect UIs.", null));
    }
}
