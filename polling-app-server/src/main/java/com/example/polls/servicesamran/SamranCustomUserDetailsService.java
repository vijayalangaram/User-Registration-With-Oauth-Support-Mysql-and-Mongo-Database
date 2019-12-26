package com.example.polls.servicesamran;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.polls.modelsamran.Role;
import com.example.polls.modelsamran.User;
import com.example.polls.repositorysamran.SamranRoleRepository;
import com.example.polls.repositorysamran.SamranUserRepository;

@Service
public class SamranCustomUserDetailsService implements UserDetailsService  

{
	
	@Autowired
    private SamranUserRepository userRepository;
    @Autowired
    private SamranRoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    
    private static final Logger logger = LoggerFactory.getLogger(SamranCustomUserDetailsService.class);
    
    //Create a method for getting user by email.

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // create a method for save a new user, encrypt the password and set a role for the user. For now, we will use role `ADMIN` for all newly registered user.

    public void saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        Role userRole = roleRepository.findByRole("USER");
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);
    }

    
    //Create a method for handling the login mechanism that checks or compares username with the user from MongoDB collection.

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);  
        if(user != null) {
            List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
            return buildUserForAuthentication(user, authorities);
        } else {
            throw new UsernameNotFoundException("username not found");
        }
    }

    
    //That method has a method for converting the user roles as GrantedAuthority collection. Create a new method like this.
    
    private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        userRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
        return grantedAuthorities;
    }

    
    //Finally, add the method for connecting MongoDB user to Spring Security user as called from the `loadUserByUsername` method.
    
    private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

}
