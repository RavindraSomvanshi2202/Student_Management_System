package com.flynaut.sms.repository;

import com.flynaut.sms.enums.UserRole;
import com.flynaut.sms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{


    User findByRole(UserRole userRole);

    Optional<User> findFirstByEmail(String email);

    List<User> findAllByRole(UserRole userRole);
}
