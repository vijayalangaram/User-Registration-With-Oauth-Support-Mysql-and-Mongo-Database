package com.example.polls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.polls.modelsamran.Role;
import com.example.polls.repository.UserRepository;
import com.example.polls.repositorysamran.SamranUserRepository;
import com.example.polls.repositorysamran.SamranRoleRepository;
import javax.annotation.PostConstruct;
import java.util.TimeZone;



@EnableJpaRepositories (basePackageClasses=UserRepository.class)
@EnableMongoRepositories(basePackageClasses=SamranUserRepository.class)


@EntityScan(basePackageClasses = {
		PollsApplication.class,
		Jsr310JpaConverters.class
})

@SpringBootApplication
public class PollsApplication implements CommandLineRunner 

{
	
	//
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	public static void main(String[] args) {
		SpringApplication.run(PollsApplication.class, args);
	}

	
	/// set a role for a user after Oauth  login/register
	 @Bean
	    CommandLineRunner init(SamranRoleRepository roleRepository) 
	 {
	        return args -> {	      
	            
	            Role userRole = roleRepository.findByRole("USER");
	            if (userRole == null) {
	                Role newUserRole = new Role();
	                newUserRole.setRole("USER");
	                roleRepository.save(newUserRole);
	            }
	        };
	    }
	 
	 
	 /// command line arguments
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
}




//Role adminRole = roleRepository.findByRole("ADMIN");
//if (adminRole == null) {
//    Role newAdminRole = new Role();
//    newAdminRole.setRole("ADMIN");
//    roleRepository.save(newAdminRole);
//}
