package com.selection;

import com.selection.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class SelectionApplication {

	public static void main(String[] args) {
		SpringApplication.run(SelectionApplication.class, args);
	}

}
