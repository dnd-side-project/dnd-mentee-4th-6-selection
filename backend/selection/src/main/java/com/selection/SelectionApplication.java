package com.selection;

import com.selection.config.AppProperties;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
@EnableJpaAuditing
public class SelectionApplication {

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
        + "classpath:application.yaml,"
        + "classpath:application-oauth.yaml";

    public static void main(String[] args) {
        new SpringApplicationBuilder(SelectionApplication.class)
            .properties(APPLICATION_LOCATIONS)
            .run(args);
    }
}
