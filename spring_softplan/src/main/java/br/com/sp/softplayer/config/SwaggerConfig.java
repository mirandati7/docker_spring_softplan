package br.com.sp.softplayer.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.collect.Lists;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket api() {
		return  new Docket(DocumentationType.SWAGGER_2)
				 .select()
				 .apis(RequestHandlerSelectors.basePackage("br.com.sp.sofplayer"))
				 .paths(PathSelectors.any())
				 .build()
				 .apiInfo(metaData())
				 .securitySchemes(Lists.newArrayList(apiKey()))
		            .securityContexts(Lists.newArrayList(securityContext()))
	                .useDefaultResponseMessages(false);
	}
	
	  private ApiInfo metaData() {
	        ApiInfo apiInfo = new ApiInfo(
	                "Aplicação de Desafio SOFTPLAN ",
	                "Spring Boot Java 8",
	                "1.0",
	                "Terms of service",
	                new Contact("Alex Miranda", "http://mr7tecnologia.com.br", "mirandati719@gmail.com"),
	                "Apache License Version 2.0",
	                "https://www.apache.org/licenses/LICENSE-2.0"
	                );
	        return apiInfo;
	    }
	  
	  @Bean
	  SecurityContext securityContext() {
	      return SecurityContext.builder()
	              .securityReferences(defaultAuth())
	              .forPaths(PathSelectors.any())
	              .build();
	  }

	  List<SecurityReference> defaultAuth() {
	      AuthorizationScope authorizationScope
	              = new AuthorizationScope("global", "accessEverything");
	      AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
	      authorizationScopes[0] = authorizationScope;
	      return Lists.newArrayList(
	              new SecurityReference("JWT", authorizationScopes));
	  }

	  
	  private ApiKey apiKey() {
		    return new ApiKey("JWT", "Authorization", "header");
		}
	

}
