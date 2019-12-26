import React, { Component } from 'react';
import { createNewUser } from '../util/APIUtils';
import { Form, Input, Button,  notification } from 'antd';
import { Link } from 'react-router-dom';
import './NewCar.css';

const FormItem = Form.Item;
const { TextArea } = Input


class NewCar extends Component {
	constructor(props) {
	  super(props)
	  this.state =   {
	
		userdata:{
			email : '',
			password:'',
			fullname :'',

		  },
		  successmessage:'',
		
	  	};

	

	this.handleuserformentry = this.handleuserformentry.bind(this);
	this.submitFunc = this.submitFunc.bind(this);
	this.handleinputonblurevent = this.handleinputonblurevent.bind(this);
}

handleuserformentry(event){
	let elid = event.target.id;
	
	let itemId = event.target.getAttribute('itemid');        
	let cdata = this.state.userdata;

	if(elid == "email"){
	   
		cdata.email = event.target.value;            
	}

	if(elid == "password"){
		this.clearallerrormesssage();
		cdata.password = event.target.value;
	}

	if(elid == "fullname"){
		this.clearallerrormesssage();
		cdata.fullname = event.target.value;            
	}


	
	this.setState({userdata: cdata});
  console.log(this.state.userdata);
	localStorage.setItem('userdata',JSON.stringify(cdata));

  }

submitFunc(){

	this.clearallerrormesssage();
	let cdata = this.state.userdata;
   //console.log(cdata);
	let validateform = 1; 

	if(cdata.fullname == ""){  
		document.getElementById('fullname').focus();                   
		document.getElementById('error_fullname').innerHTML='Please enter your fullname';
		validateform = 0;
	}

	else if(cdata.password== ""){  
		document.getElementById('password').focus();                   
		document.getElementById('error_password').innerHTML='Please enter your password';
		validateform = 0;
	}

		
	else if(cdata.email== ""){  
		document.getElementById('email').focus();                   
		document.getElementById('error_email').innerHTML='Please enter your email';
		validateform = 0;
	}

	
	
 if(validateform == 1){
let userdata = this.state.userdata;
var data = {
		
			password:this.state.userdata.password,
			fullname:this.state.userdata.fullname,
			email:this.state.userdata.email,
			
}
		
			
	 console.log(data);
	 createNewUser(data)
 .then(response => 
 	{
		 console.log(response);
		 let successmessage;

		 this.setState({
			 successmessage:response.message
			 
		 });

 	this.props.history.push("/CarLogin");
 }).catch(error => {
 	if(error.status === 401) {
 		this.props.handleLogout('/login', 'error', 'You have been logged out.');    
 	} else {
 		notification.error({
 			message: 'SAMRAN APP',
		description: error.message || 'Sorry! Something went wrong. Please try again!'
		});              
	}  }); }  }

clearallerrormesssage(){
        
	document.getElementById('error_fullname').innerHTML = '';
	document.getElementById('error_password').innerHTML = '';	
	document.getElementById('error_email').innerHTML = '';


  }

  handleinputonblurevent(event) {      
	let elid = event.target.id;
	this.clearallerrormesssage();
	
	if(elid == "email"){         
		let email =  event.target.value;
		if(this.validateattendeeemail(email) != true){
			this.setState({userformvalid: 0});
			document.getElementById('error_email').innerHTML = 'Please enter the valid email address';
		}

	}
  
}
validateattendeeemail(email){
      
	let formIsValid = true;
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	if (!pattern.test(email)) {
	  formIsValid = false;         
	}
	return formIsValid;

  }


	render() 	{
		return (
			<div className="new-car-container">
				<br/> <br/>
			<h1 className="page-title">USER REGISTRATION</h1>
			<div className="new-car-content"> 	
				
			<div className="car-form-row">
            <label> FULL NAME<sup>*</sup></label>
            <div >
            <input type="text" name="fullname" id="fullname" className="car-form-row"   autoComplete="nope" value = {this.state.userdata.fullname} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_fullname" ></div>
            </div>


			<div className="car-form-row">
            <label> Password <sup>*</sup></label>
            <div >
            <input type="password" name="Password" id="password" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.password} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_password" ></div>
            </div>



			<div className="car-form-row">
            <label>Email  <sup>*</sup></label>
            <div >
            <input type="text" name="email" id="email" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.email} onChange={this.handleuserformentry}  onBlur={this.handleinputonblurevent}/>
            </div>
            <div className="erromessage" id="error_email" ></div>
            </div>
   <label>
   {
	   this.state.successmessage
   }

   </label>

			<div className="car-form-row ">
           
			<button type="submit"  className="create-car-form-button" onClick={this.submitFunc} >REGISTER</button>
			</div>

			<div> 
					<center> <Link to ={"/CarLogin"}> or Login  </Link>  </center>
					</div>

		
			</div>
			</div>
			
    );

	} }


 export default NewCar;