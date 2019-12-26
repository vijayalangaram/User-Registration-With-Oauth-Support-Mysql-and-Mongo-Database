import React, { Component } from 'react';
import { createCar } from '../util/APIUtils';
import { Form, Input, Button,  notification } from 'antd';
import { Link } from 'react-router-dom';
import './NewCar.css';

const FormItem = Form.Item;
const { TextArea } = Input



class NewCar extends Component {
	constructor(props) {
	  super(props)
	  this.state =   {
		// username: {
		// 	text: ''
		// },
		// password: {
		// 	password: ''
		// },
		// firstname: {
		// 	text: ''
		// },
		// lastname: {
		// 	text: ''
		// },
		// emailid: {
		// 	email: ''
		// },

		userdata:{
			username : '',
			password:'',
			firstname :'',
			lastname :'',
			emailid:'',		

		  },
		  successmessage:'',
		
	  	};

	// this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
	// this.handleLastnameChange = this.handleLastnameChange.bind(this);
	
	// this.handleUsernameChange = this.handleUsernameChange.bind(this);
	// this.handlePasswordChange = this.handlePasswordChange.bind(this);

	// this.handleEmailidChange = this.handleEmailidChange.bind(this);
	

	// this.isFormInvalid = this.isFormInvalid.bind(this);

	this.handleuserformentry = this.handleuserformentry.bind(this);
	this.submitFunc = this.submitFunc.bind(this);
	this.handleinputonblurevent = this.handleinputonblurevent.bind(this);
}

handleuserformentry(event){
	let elid = event.target.id;
	
	let itemId = event.target.getAttribute('itemid');        
	let cdata = this.state.userdata;

	if(elid == "username"){
	   
		cdata.username = event.target.value;            
	}

	if(elid == "password"){
		this.clearallerrormesssage();
		cdata.password = event.target.value;
	}

	if(elid == "firstname"){
		this.clearallerrormesssage();
		cdata.firstname = event.target.value;            
	}

	if(elid == "lastname"){
		this.clearallerrormesssage();
		cdata.lastname = event.target.value;
	}
	if(elid == "emailid"){
		this.clearallerrormesssage();
		cdata.emailid = event.target.value;
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

	if(cdata.username.trim()== ""){  
		document.getElementById('username').focus();                   
		document.getElementById('error_username').innerHTML='Please enter your user name';
		validateform = 0;
	}

	else if(cdata.password.trim()== ""){  
		document.getElementById('password').focus();                   
		document.getElementById('error_password').innerHTML='Please enter your password';
		validateform = 0;
	}

	
	else if(cdata.firstname.trim()== ""){  
		document.getElementById('firstname').focus();                   
		document.getElementById('error_firstname').innerHTML='Please enter your first name';
		validateform = 0;
	}
	else if(cdata.lastname.trim()== ""){  
		document.getElementById('lastname').focus();                   
		document.getElementById('error_lastname').innerHTML='Please enter your last name';
		validateform = 0;
	}
	else if(cdata.emailid.trim()== ""){  
		document.getElementById('emailid').focus();                   
		document.getElementById('error_email').innerHTML='Please enter your email';
		validateform = 0;
	}

	
	
 if(validateform == 1){
let userdata = this.state.userdata;
var data = {
	username:this.state.userdata.username,
			password:this.state.userdata.password,
			firstname:this.state.userdata.firstname,
			lastname:this.state.userdata.lastname,
			emailid:this.state.userdata.emailid,
			password:this.state.userdata.password,
}
		
			
	 console.log(data);

	 createCar(data)
 .then(response => 
 	{
		 console.log(response);
		 let successmessage;

		 this.setState({
			 successmessage:response.message
			 
		 });

 	this.props.history.push("/");
 }).catch(error => {
 	if(error.status === 401) {
 		this.props.handleLogout('/login', 'error', 'You have been logged out.');    
 	} else {
 		notification.error({
 			message: 'USER App',
		description: error.message || 'Sorry! Something went wrong. Please try again!'
		});              
	}
 });

}
  

}

clearallerrormesssage(){
        
	document.getElementById('error_firstname').innerHTML = '';
	document.getElementById('error_lastname').innerHTML = '';
	document.getElementById('error_email').innerHTML = '';
	document.getElementById('error_username').innerHTML = '';	
	document.getElementById('error_password').innerHTML = '';	
  }

  handleinputonblurevent(event) {      
	let elid = event.target.id;
	this.clearallerrormesssage();
	
	if(elid == "emailid"){         
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

//   handleSubmit(event) 
//   {
//   console.log('click');
//   event.preventDefault();	
//   const carData = 
//   {
// 	  username:this.state.userdata.username.text,
// 	  password:this.state.userdata.password.password,
// 	  firstname:this.state.userdata.firstname.text,
// 	  lastname:this.state.userdata.lastname.text,
// 	 emailid:this.state.userdata.emailid.email,
		 
//   };


//  createCar(carData)
//  .then(response => 
//  	{
//  	this.props.history.push("/");
//  }).catch(error => {
//  	if(error.status === 401) {
//  		this.props.handleLogout('/login', 'error', 'You have been logged out.');    
//  	} else {
//  		notification.error({
//  			message: 'USER App',
// 		description: error.message || 'Sorry! Something went wrong. Please try again!'
// 		});              
// 	}
//  });
//  }	
		
//    validateUsername = (usernameText) => {
//         if(usernameText.length === 0) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Please enter your username!'
//             }
//         } else if (usernameText.length > CAR_USERNAME_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `username is too long (Maximum ${CAR_USERNAME_MAX_LENGTH} characters allowed)`
//             }    
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null
//             }        }    }

// 	handleUsernameChange(event) 
// 	{
//         const value = event.target.value;
//         this.setState({
//             username: {
//                 text: value,
//                 ...this.validateUsername(value)
//             }       }); 	}
	

// 	validatePassword = (passwordPassword) => {
//         if(passwordPassword.length === 0) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Please enter your Password!'
//             }
//         } else if (passwordPassword.length > CAR_PASSWORD_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Password is too long (Maximum ${CAR_PASSWORD_MAX_LENGTH} characters allowed)`
//             }    
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null
//             }        }    } 

// 	handlePasswordChange(event) 
// 	{
//         const value = event.target.value;
//         this.setState({
//             password: {
//                 password: value,
//                 ...this.validatePassword(value)
//             }         }); 	}
	
// 	validateFirstname = (firstnameText) => {
//         if(firstnameText.length === 0) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Please enter your firstname!'
//             }
//         } else if (firstnameText.length > CAR_FIRSTNAME_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `firstname is too long (Maximum ${CAR_FIRSTNAME_MAX_LENGTH} characters allowed)`
//             }    
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null
//             }         }     }

// 	handleFirstnameChange(event) 
// 	{
//         const value = event.target.value;
//         this.setState({
//             firstname: {
//                 text: value,
//                 ...this.validateFirstname(value)
//             }        });	}
	


// 	validateLastname = (lastnameText) => {
//         if(lastnameText.length === 0) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Please enter your Lastname!'
//             }
//         } else if (lastnameText.length > CAR_LASTNAME_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Lastname is too long (Maximum ${CAR_LASTNAME_MAX_LENGTH} characters allowed)`
//             }    
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null
//             }          }    }

// 	handleLastnameChange(event) 
// 	{
//         const value = event.target.value;
//         this.setState({
//             lastname: {
//                 text: value,
//                 ...this.validateLastname(value)
//             }        });	}	

// 	validateEmailId = (emailidEmail) => {
//         if(emailidEmail.length === 0) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: 'Please enter your Email!'
//             }
//         } else if (emailidEmail.length > CAR_EMAIL_MAX_LENGTH) {
//             return {
//                 validateStatus: 'error',
//                 errorMsg: `Email is too long (Maximum ${CAR_EMAIL_MAX_LENGTH} characters allowed)`
//             }    
//         } else {
//             return {
//                 validateStatus: 'success',
//                 errorMsg: null
//             }
//         }
//     }

// 	handleEmailidChange(event) 
// 	{
//         const value = event.target.value;
//         this.setState({
//             emailid: {
//                 email: value,
//                 ...this.validateEmail(value)
//             }
//         });
// 	}
	


// 	isFormInvalid() 
// 	   {
// 		// if (this.state.username.validateStatus !== 'success' && this.state.password.validateStatus !== 'success' && this.state.firstname.validateStatus !== 'success' && this.state.lastname.validateStatus !== 'success' && this.state.email.validateStatus !== 'success')
// 		//  {
//         //     return true;
//         // }
       
// 	}


	render() 	{
		return (
			<div className="new-car-container">
				<br/> <br/>
			<h1 className="page-title">USER REGISTRATION</h1>
			<div className="new-car-content"> 	
				
			<div className="car-form-row">
            <label> User Name<sup>*</sup></label>
            <div >
            <input type="text" name="username" id="username" className="car-form-row"   autoComplete="nope" value = {this.state.userdata.username} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_username" ></div>
            </div>


			<div className="car-form-row">
            <label> Password <sup>*</sup></label>
            <div >
            <input type="password" name="Password" id="password" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.password} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_password" ></div>
            </div>




			<div className="car-form-row">
            <label>First Name <sup>*</sup></label>
            <div >
            <input type="text" name="firstname" id="firstname" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.firstname} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_firstname" ></div>
            </div>



			<div className="car-form-row">
            <label>Last Name <sup>*</sup></label>
            <div >
            <input type="text" name="lastname" id="lastname" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.lastname} onChange={this.handleuserformentry} />
            </div>
            <div className="erromessage" id="error_lastname" ></div>
            </div>
			<div className="car-form-row">
            <label>Email  <sup>*</sup></label>
            <div >
            <input type="text" name="emailid" id="emailid" className="inputborderbox"   autoComplete="nope" value = {this.state.userdata.emailid} onChange={this.handleuserformentry}  onBlur={this.handleinputonblurevent}/>
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


				{/* <Form onSubmit={this.handleSubmit} className="create-car-form"> 				
				<FormItem validateStatus={this.state.username.validateStatus}						
						help={this.state.username.errorMsg} className="car-form-row">
					<TextArea 
						placeholder="Enter your username"
						style = {{ fontSize: '16px' }} 
						autosize={{ minRows: 1, maxRows: 2 }} 
						name = "username"
						value = {this.state.username.text}
						onChange = {this.handleUsernameChange} />
					</FormItem>


					<FormItem validateStatus={this.state.password.validateStatus}						
						help={this.state.password.errorMsg} className="car-form-row">
					<TextArea 
						placeholder="Enter your password"
						style = {{ fontSize: '16px' }} 
						autosize={{ minRows: 1, maxRows: 2 }} 
						name = "password"
						value = {this.state.password.password}
						onChange = {this.handlePasswordChange} />
					</FormItem>	


					
					<FormItem validateStatus={this.state.firstname.validateStatus}						
						help={this.state.firstname.errorMsg} className="car-form-row">
					<TextArea 
						placeholder="Enter your firstname"
						style = {{ fontSize: '16px' }} 
						autosize={{ minRows: 1, maxRows: 2 }} 
						name = "firstname"
						value = {this.state.firstname.text}
						onChange = {this.handleFirstnameChange} />
					</FormItem>	

					
					<FormItem validateStatus={this.state.lastname.validateStatus}						
						help={this.state.lastname.errorMsg} className="car-form-row">
					<TextArea 
						placeholder="Enter your lastname"
						style = {{ fontSize: '16px' }} 
						autosize={{ minRows: 1, maxRows: 2 }} 
						name = "lastname"
						value = {this.state.lastname.text}
						onChange = {this.handleLastnameChange} />
					</FormItem>	


					
					<FormItem validateStatus={this.state.emailid.validateStatus}						
						help={this.state.emailid.errorMsg} className="car-form-row">
					<TextArea 
						placeholder="Enter your emailid"
						style = {{ fontSize: '16px' }} 
						autosize={{ minRows: 1, maxRows: 1 }} 
						name = "emailid"
						value = {this.state.emailid.email}
						onChange = {this.handleEmailidChange} />
					</FormItem>	



					<FormItem className="car-form-row">
						<Button type="primary" 
							htmlType="submit" 
							size="large" 
							disabled={this.isFormInvalid()}
							className="create-car-form-button"> REGISTER </Button>
					</FormItem>

					<div> 
						<li> <center> <Link to ={"/CarLogin"}>  OR LOGIN here  </Link> </center> </li>
					</div>



			</Form> */}

					<div> 
					<center> <Link to ={"/CarLogin"}> or  USER Login  </Link>  </center>
					</div>
{/*  */}

			</div>
			</div>
			
    );

	} }


 export default NewCar;