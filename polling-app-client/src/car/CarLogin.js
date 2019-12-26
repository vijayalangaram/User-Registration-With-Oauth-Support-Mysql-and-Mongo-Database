import React, { Component } from 'react';
import { login } from '../util/APIUtils';
import { Form, Input, Button,  notification } from 'antd';
import { Link } from 'react-router-dom';
import './CarLogin.css';

const FormItem = Form.Item;
const { TextArea } = Input



class CarLogin extends Component {
	constructor(props) {
	  super(props)
	  this.state =   {
		
		userlogindata:{
			email : '',
			password:'',
		
			
		  },
		  successmessage:'',
		
	  	};

	this.handleuserformentry = this.handleuserformentry.bind(this);
	this.submitFunc = this.submitFunc.bind(this);

	
}

handleuserformentry(event){
	let elid = event.target.id;
	
	let itemId = event.target.getAttribute('itemid');        
	let cdata = this.state.userlogindata;

	if(elid == "email")
	{
	   
		cdata.email = event.target.value;            
	}

	if(elid == "password"){
		this.clearallerrormesssage();
		cdata.password = event.target.value;
	}


	
	this.setState({userlogindata: cdata});
  console.log(this.state.userlogindata);
	localStorage.setItem('userlogindata',JSON.stringify(cdata));

  }

submitFunc(){

	this.clearallerrormesssage();
	let cdata = this.state.userlogindata;
   //console.log(cdata);
	let validateform = 1; 

	if(cdata.username== ""){  
		document.getElementById('email').focus();                   
		document.getElementById('error_email').innerHTML='Please enter your email';
		validateform = 0;
	}

	else if(cdata.password== ""){  
		document.getElementById('password').focus();                   
		document.getElementById('error_password').innerHTML='Please enter your password';
		validateform = 0;
	}

	
	
	
 if(validateform == 1){
let userlogindata = this.state.userlogindata;
var data = {

			email:this.state.userlogindata.email,
			password:this.state.userlogindata.password,		

			}
		
			
	 console.log(data);
	 login(data)
 .then(response => 
 	{
		  console.log(response);
		 let successmessage;
		 this.setState({
			 successmessage:response.message
			 
		 });

 	this.props.history.push("/Welcome");
 }).catch(error => {
 	if(error.status === 401) {
 		this.props.handleLogout('/login', 'error', 'You have been logged out.');    
 	} else {
 		notification.error({
 			message: 'SAMRAN App',
		description: error.message || 'Sorry! Something went wrong. Please try again!'
		});         
	} }); } }
  

clearallerrormesssage(){
        
	document.getElementById('error_email').innerHTML = '';	
	document.getElementById('error_password').innerHTML = '';	
  }



	render() 	{
		return (
			<div className="new-car-container">
				<br/> <br/>
			<h1 className="page-title">USER LOGIN </h1>

			<div className="new-car-content"> 	
				
			<div className="car-form-row">
            <label> MAIL<sup>*</sup></label>
            <div >
            <input type="text" name="email" id="email" className="car-form-row"   autoComplete="nope" value = {this.state.userlogindata.email} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_email" ></div>
            </div>


			<div className="car-form-row">
            <label> Password <sup>*</sup></label>
            <div >
            <input type="password" name="Password" id="password" className="inputborderbox"   autoComplete="nope" value = {this.state.userlogindata.password} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_password" ></div>
            </div>

           
   <label>
   {
	   this.state.successmessage
   }

   </label>

			<div className="car-form-row ">
           
			<button type="submit"  className="create-car-form-button" onClick={this.submitFunc}>LOGIN</button>
			</div>			
					<div> 
					<center> <Link to ={"/NewCar"}> or REGISTER  </Link>  </center>
					</div>
			</div>
			</div>
			
    );

	} 
}


 export default CarLogin;