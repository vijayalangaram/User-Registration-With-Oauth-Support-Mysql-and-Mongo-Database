package com.example.polls.repositorysamran;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.polls.modelsamran.Role;

public interface SamranRoleRepository  extends MongoRepository<Role, String> 

{
	 Role findByRole(String role);

}
