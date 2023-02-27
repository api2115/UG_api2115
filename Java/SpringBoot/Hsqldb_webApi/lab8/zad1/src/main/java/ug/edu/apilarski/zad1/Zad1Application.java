package ug.edu.apilarski.zad1;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ug.edu.apilarski.zad1.service.MikroprocesorService;

@SpringBootApplication
public class Zad1Application {

	public static void main(String[] args) {
		SpringApplication.run(Zad1Application.class, args);
	}

	@Bean
	public CommandLineRunner setUpApp(MikroprocesorService mikroprocesorService){
		return (args) ->{
			mikroprocesorService.learning();
		};
	}

}
