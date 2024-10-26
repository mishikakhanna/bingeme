package com.bingeme.controller;

import com.bingeme.dto.LoginRequest;
import com.bingeme.dto.RegisterRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        // Placeholder response
        log.info("Received login request: username={}, password={}", loginRequest.getUsername(), loginRequest.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest registerRequest) {
        // Placeholder response
        log.info("Received register request: username={}, password={}, email={}", registerRequest.getUsername(),
                registerRequest.getPassword(), registerRequest.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration successful");

        return ResponseEntity.ok(response);
    }
}