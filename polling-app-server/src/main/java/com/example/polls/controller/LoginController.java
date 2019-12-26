package com.example.polls.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.example.polls.modelsamran.User;
import com.example.polls.repository.UserRepository;
import com.example.polls.service.PollService;
import com.example.polls.servicesamran.SamranCustomUserDetailsService;

@Controller

public class LoginController  

{		
	
	       /// service after the jwt
	 	@Autowired
	    private SamranCustomUserDetailsService userService;
	 	
	 	
	 	////// repositry for jwt authetication
	 	@Autowired
	    private UserRepository userRepository;	 	
	 	@Autowired
	    private PollService pollService;
	 	
	 	
	 	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	 
	 	 	
	 	/// Create a model and view method for saving the new user when form submitted from signup page after  oauth
	 	
	 	 @PreAuthorize("hasRole('USER')")	 	 
		    @RequestMapping(value = "/signup", method = RequestMethod.POST)
		    public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) 
	 	 {
		        ModelAndView modelAndView = new ModelAndView();        
		        User userExists = userService.findUserByEmail(user.getEmail());
		        if (userExists != null) {
		            bindingResult
		                    .rejectValue("email", "error.user",
		                            "There is already a user registered with the username provided");
		        }
		        if (bindingResult.hasErrors()) {
		            modelAndView.setViewName("signup");
		        } else {
		            userService.saveUser(user);
		            modelAndView.addObject("successMessage", "User has been registered successfully");
		            modelAndView.addObject("user", new User());
		            modelAndView.setViewName("login");
		        }
		        return modelAndView;    
		        }
	 
	 ////Create a model and view method for login page.
		    
	 	@PreAuthorize("hasRole('USER')")
	 	
	    @RequestMapping(value = "/login", method = RequestMethod.GET)
	    public ModelAndView login() {
	        ModelAndView modelAndView = new ModelAndView();
	        modelAndView.setViewName("login");
	        return modelAndView;
	    }
	 	
	 	
	 	
//	 	@ExceptionHandler(value = {CustomGenericException.class})
//	 	public ModelAndView handleAllException(CustomGenericException ex, 
//	 	HttpServletRequest req) {
//	 	    ModelAndView model = new ModelAndView();
//	 	    model.addObject("exception", ex);
//	 	    model.addObject("url", req.getRequestURL());
//	 	    model.addObject("errMsg", "We are sorry. "+
//	 	    "Your request cannot be done, please try again later! ");
//	 	    model.addObject("admin", new Admin());	 	    	 	
//	 	    return model;
//	 	}

	 	
	 	//Create a model and view method for signup/register page.
	    @RequestMapping(value = "/signup", method = RequestMethod.GET)
	    public ModelAndView signup() {
	        ModelAndView modelAndView = new ModelAndView();
	        User user = new User();
	        modelAndView.addObject("user", user);
	        modelAndView.setViewName("signup");
	        return modelAndView;
	    }

	    
	   //Create a model and view method for dashboard page which is a secure page that will show a data from the successful login.

	    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	    public ModelAndView dashboard() {
	        ModelAndView modelAndView = new ModelAndView();
	        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	        User user = userService.findUserByEmail(auth.getName());
	        modelAndView.addObject("currentUser", user);
	        modelAndView.addObject("fullName", "Welcome " + user.getFullname());
	        modelAndView.addObject("adminMessage", "Content Available Only for Users with Admin Role");
	        modelAndView.setViewName("dashboard");
	        return modelAndView;
	    }
	    
	    //Finally, create  a model and view for initial page that load in the front of the browser.
	    
	    @PreAuthorize("hasRole('USER')")
	    
	    @RequestMapping(value = {"/","/home"}, method = RequestMethod.GET)
	    public ModelAndView home() {
	        ModelAndView modelAndView = new ModelAndView();
	        modelAndView.setViewName("home");
	        return modelAndView;
	    }

}
