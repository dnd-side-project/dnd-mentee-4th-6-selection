package com.selection.config;

import static java.util.Collections.singleton;
import static java.util.Collections.singletonList;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket apiDocket() {
        String API_BASE_PACKAGE = "com.selection.controller";
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .securitySchemes(singletonList(apiKey()))
            .securityContexts(singletonList(securityContext()))
            .produces(singleton("application/json"))
            .consumes(singleton("application/json"))
            .useDefaultResponseMessages(false)
            .select()
            .apis(RequestHandlerSelectors.basePackage(API_BASE_PACKAGE))
            .paths(PathSelectors.any())
            .build();
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences(securityReference())
            .forPaths(PathSelectors.any())
            .build();
    }

    private List<SecurityReference> securityReference() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global",
            "accessEverything");
        return singletonList(
            new SecurityReference("Bearer JWT", new AuthorizationScope[]{authorizationScope}));
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer JWT", "Authorization", "header");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("API Swagger")
            .description("테스트")
            .build();

    }
}
