package com.selection;

import com.selection.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
@EnableJpaAuditing
public class SelectionApplication {

    private static final Logger LOG = LoggerFactory.getLogger(SelectionApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SelectionApplication.class, args);
    }
}
