import React, { Component } from "react";
class NewCar extends React.Component 
{
	constructor(props) {
	  super(props)
	  this.state = {
		formValues: {}
	  }
	}
  
	handleChange(event) {
	  event.preventDefault();
	  let formValues = this.state.formValues;

	  let name = event.target.name;

	  let username = event.target.username;
	  let password = event.target.password;
	  let firstname = event.target.firstname;
	  let lastname = event.target.lastname;	  
	  let email = event.target.email;
	 


	  let value = event.target.value;  
	  formValues[name] = value;

	  formValues[username] = username;
	  formValues[password] = password;	  
	  formValues[firstname] = firstname; 
	  formValues[lastname] = lastname;
	  formValues[email] = email;	  
	 
	  
	   this.setState({formValues})
	}
  
	handleSubmit(event) 
	{
	  event.preventDefault();
	  alert( " USER: " + this.state.formValues.username + " Password: " + this.state.formValues.password +  " FN: " + this.state.formValues.firstname + " LN: " + this.state.formValues.lastname +   " Email: " + this.state.formValues.email  );
	}


	
  
	render(){
	  return (

		
		<form onSubmit={this.handleSubmit.bind(this)}>
		<form method="POST"	 action="/cars">


		<span/>
		

<br/><br/>
			<h1>ADD DETAILS</h1>
		  
      

			<br/>

			<label> Username..
			<input type="text" name="username"  value={this.state.formValues["username"]} onChange={this.handleChange.bind(this)}   />
		  </label><br /> <br/>

		
		  <label> password..
			<input type="password" name="password" value={this.state.formValues["password"]} onChange={this.handleChange.bind(this)}/>
		  </label><br /><br/>

		
		  <label> FirstName..
			<input type="text" name="firstname"  value={this.state.formValues["firstname"]} onChange={this.handleChange.bind(this)}   />
		  </label><br /> <br/>

		  <label> LastName..
			<input type="text" name="lastname"  value={this.state.formValues["lastname"]} onChange={this.handleChange.bind(this)}/>
		  </label><br /><br/>

		 

		  <label> Email...
			<input type="text" name="email"  value={this.state.formValues["email"]} onChange={this.handleChange.bind(this)}   />
		  </label><br /> <br/>


		 

		  		  <input className="btn btn-primary" type="submit" value="Submit" />

			<br/>	


			</form>	
   
			</form>
			  
				  
	  )
	}
  }
  
  export default NewCar;