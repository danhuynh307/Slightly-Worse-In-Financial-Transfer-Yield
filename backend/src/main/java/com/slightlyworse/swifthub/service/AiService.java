package com.slightlyworse.swifthub.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * AI features, powered by Spring AI's ChatClient (it owns the Anthropic HTTP/SDK
 * calls). We only write the prompts — the part that's specific to this app.
 * All AI stays server-side so the API key never reaches the browser.
 */
@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    /** Generate a short first-person professional bio for the About Me page. */
    public String generateBio(String name, String role, String keywords) {
        return chatClient.prompt()
                .user(u -> u.text("""
                        Write a friendly, first-person professional bio of about two sentences
                        for {name}, who works as {role}. Weave in these keywords where natural:
                        {keywords}. Return only the bio text, no preamble.""")
                        .param("name", name)
                        .param("role", role == null ? "a team member" : role)
                        .param("keywords", keywords == null ? "" : keywords))
                .call()
                .content();
    }

    /** Extract expertise tags from pasted text (e.g. a Confluence doc or resume). */
    public List<String> extractExpertise(String text) {
        return chatClient.prompt()
                .user(u -> u.text("""
                        Extract 3-8 concise technical skill / expertise tags from the text below.
                        Prefer short canonical names (e.g. "Spring", "Kubernetes", "React").
                        Text:

                        {text}""")
                        .param("text", text))
                .call()
                .entity(new ParameterizedTypeReference<List<String>>() {});
    }
}
