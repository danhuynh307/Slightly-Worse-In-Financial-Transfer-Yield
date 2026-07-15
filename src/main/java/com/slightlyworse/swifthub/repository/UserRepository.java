package com.slightlyworse.swifthub.repository;

import com.slightlyworse.swifthub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
