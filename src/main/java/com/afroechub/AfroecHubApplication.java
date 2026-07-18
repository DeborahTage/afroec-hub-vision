package com.afroechub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AfroecHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(AfroecHubApplication.class, args);
    }
}
