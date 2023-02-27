package ug.edu.apilarski.zad1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.service.MikroprocesorManager;

@SpringBootApplication
public class Zad1Application {

	public static void main(String[] args) {
		SpringApplication.run(Zad1Application.class, args);
	}

	@Bean
	public CommandLineRunner runner(@Autowired MikroprocesorManager mikroprocesorManager){
		return args -> {
			mikroprocesorManager.addMikroprocesor(new Mikroprocesor("Intel","4004",1,1,750,"DIP16","10 μm"));
		};
	}

}
