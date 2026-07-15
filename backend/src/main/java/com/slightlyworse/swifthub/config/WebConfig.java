package com.slightlyworse.swifthub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Prefixes our own controllers with /api, so they can declare plain paths
 * (e.g. "/users") and still be served under "/api/users". Scoped to our package
 * so it does NOT rewrite springdoc's /v3/api-docs or the H2 console.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api",
                HandlerTypePredicate.forBasePackage("com.slightlyworse.swifthub.controller"));
    }
}
