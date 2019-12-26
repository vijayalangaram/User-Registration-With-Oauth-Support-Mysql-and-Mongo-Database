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
	  let age = event.target.age;


	  let value = event.target.value;  
	  formValues[name] = value;

	  formValues[username] = username;
	  formValues[password] = password;	  
	  formValues[firstname] = firstname; 
	  formValues[lastname] = lastname;
	  formValues[email] = email;	  
	  formValues[age] = age;
	  
	   this.setState({formValues})
	}
  
	handleSubmit(event) 
	{
	  event.preventDefault();
	  alert( " USER: " + this.state.formValues.username + " Password: " + this.state.formValues.password +  " FN: " + this.state.formValues.firstname + " LN: " + this.state.formValues.lastname +   " Email: " + this.state.formValues.email  + " Age: " + this.state.formValues.age );
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
		
		  <label> FirstName..
			<input type="text" name="firstname"  value={this.state.formValues["firstname"]} onChange={this.handleChange.bind(this)}   />
		  </label><br /> <br/>

		  <label> LastName..
			<input type="text" name="lastname"  value={this.state.formValues["lastname"]} onChange={this.handleChange.bind(this)}/>
		  </label><br /><br/>

		  <label> About..
			<input type="text" name="about" value={this.state.formValues["about"]} onChange={this.handleChange.bind(this)}/>
		  </label><br /><br/>

		  <label> Email...
			<input type="text" name="email"  value={this.state.formValues["email"]} onChange={this.handleChange.bind(this)}   />
		  </label><br /> <br/>


		  <label> Year:..
			<input type="text" name="year"  value={this.state.formValues["year"]} onChange={this.handleChange.bind(this)}/>
		  </label><br /><br/>

		  		  <input className="btn btn-primary" type="submit" value="Submit" />

			<br/>			
			</form>

			<h2>Search.. </h2>
		<form action="/search" method="POST">
			<input type="text" name="search" id="search" value={this.state.formValues["search"]} />
			<br/>
			<input type="submit" value="Search" />
		</form>
<span> 
    <br/><br/>
		<table>
			<thead>
				<tr>
					<th>FIRSTNAME__</th> <br/>
					<th>LASTNAME__</th> <br/>
					<th>USERNAME__</th> <br/>
					<th>MAIL__</th> <br/>
					<th>ABOUT__</th> <br/>
					<th>YEAR__</th><br/>
				</tr>
			</thead>
			<tbody>
				<tr each="car : ${carList}">
					<td text="${car.make}"></td>
					<td text="${car.model}"></td>
					<td text="${car.description}"></td>
					<td text="${car.year}"></td>
				</tr>
			</tbody>
		</table>
		<br />
		</span>
			</form>
			  
				  
	  )
	}
  }
  
  export default NewCar;