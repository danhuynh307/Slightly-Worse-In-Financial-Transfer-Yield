package com.slightlyworse.swifthub.controller;

import com.slightlyworse.swifthub.service.AiService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import java.util.List;

// AI endpoints under /api/ai. Only active when ANTHROPIC_API_KEY is set;
// without a key the app still boots, these calls just error at request time.
@RestController
@RequestMapping("/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    public record BioRequest(@NotBlank String name, String role, String keywords) {}

    public record BioResponse(String bio) {}

    public record ExtractRequest(@NotBlank String text) {}

    public record ExtractResponse(List<String> tags) {}

    @PostMapping("/bio")
    public BioResponse generateBio(@Valid @RequestBody BioRequest req) {
        return new BioResponse(aiService.generateBio(req.name(), req.role(), req.keywords()));
    }

    @PostMapping("/expertise")
    public ExtractResponse extractExpertise(@Valid @RequestBody ExtractRequest req) {
        return new ExtractResponse(aiService.extractExpertise(req.text()));
    }
}
