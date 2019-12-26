import React, { Component } from 'react';
import { carLogin } from '../util/APIUtils';
import {  CAR_USERNAME_MAX_LENGTH,CAR_PASSWORD_MAX_LENGTH} from '../constants';
import { Form, Input, Button,  notification } from 'antd';

import { Link } from 'react-router-dom';


const FormItem = Form.Item;
const { TextArea } = Input


class CarLogin extends Component {
	constructor(props) {
	  super(props)
	  this.state =   {
		username: {
			text: ''
		},
		password: {
			password: ''
		}
		
	  	};

		  this.handleUsernameChange = this.handleUsernameChange.bind(this);
		  this.handlePasswordChange = this.handlePasswordChange.bind(this);
	  

	this.isFormInvalid = this.isFormInvalid.bind(this);
}


handleSubmit(event) 
{
	event.preventDefault();	
	const loginData = 
	{
		username:this.state.username.text,
		password:this.state.password.password	
		
	};

	carLogin(loginData)
	.then(response => 
		{
		this.props.history.push("/");
	}).catch(error => {
		if(error.status === 401) {
			this.props.handleLogout('/login', 'error');    
		} else {
			notification.error({
				message: ' App',
				description: error.message || 'Sorry! Something went wrong. Please try again!'
			});              
		}
	});
}	
		
   validateUsername = (usernameText) => {
        if(usernameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your username!'
            }
        } else if (usernameText.length > CAR_USERNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `username is too long (Maximum ${CAR_USERNAME_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }        }    }

	handleUsernameChange(event) 
	{
        const value = event.target.value;
        this.setState({
            username: {
                text: value,
                ...this.validateUsername(value)
            }       }); 	}
	

	validatePassword = (passwordPassword) => {
        if(passwordPassword.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your Password!'
            }
        } else if (passwordPassword.length > CAR_PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too long (Maximum ${CAR_PASSWORD_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }        }    } 

	handlePasswordChange(event) 
	{
        const value = event.target.value;
        this.setState({
            password: {
                password: value,
                ...this.validatePassword(value)
            }         }); 	}


	isFormInvalid() 
	   {
		if (this.state.username.validateStatus !== 'success' && this.state.password.validateStatus !== 'success' )
		 {
            return true;
        }
       
	}


	render() 	{
		return (
			<div className="new-car-container">
				<br/> <br/>
			<h1 className="page-title">USER LOGIN</h1>
			<div className="new-car-content"> 		
         
				<Form onSubmit={this.handleSubmit} className="create-car-form"> 				
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


					<FormItem className="car-form-row">
						<Button type="primary" 
							htmlType="submit" 
							size="large" 
							disabled={this.isFormInvalid()}
							className="create-car-form-button"> LOGIN </Button>
					</FormItem>


			</Form>

			<div> 
		 <center> <Link to ={"/NewCar"}> or NEW USER REGISTER   </Link>  </center>
   		  </div>

			</div>
			</div>
			
    );

	} 
}


 export default CarLogin;