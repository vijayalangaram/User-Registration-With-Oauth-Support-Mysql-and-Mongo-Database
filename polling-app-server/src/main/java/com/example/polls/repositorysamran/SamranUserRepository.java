package com.example.polls.repositorysamran;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.polls.modelsamran.User;


public interface SamranUserRepository extends MongoRepository<User, String>  

{
	User findByEmail(String email);
    
	
}
