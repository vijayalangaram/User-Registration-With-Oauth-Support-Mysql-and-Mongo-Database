import React, { Component } from 'react';
import { Avatar  } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import {  Button } from 'antd';

class Car extends Component 
{
 render() 
 {
         return (

            <div className="-content">
            <div className="-header">
                <div className="-creator-info">

                <Link className="creator-link" to={`/users/${this.props.car.createdBy.username}`}>
                            <Avatar className="-creator-avatar" 
                                style={{ backgroundColor: getAvatarColor(this.props.car.createdBy.name)}} >
                                {this.props.car.createdBy.name[0].toUpperCase()}
                            </Avatar>

                            <span className="-creator-name">
                                {this.props.car.createdBy.name}
                            </span>
                            <span className="-creator-username">
                                @{this.props.car.createdBy.username}
                            </span>

                            </Link>

    <div className="username">
    {this.props.car.username}
    </div>

    <div className="password">
    {this.props.car.password}
    </div>

    <div className="firstname">
    {this.props.car.firstname}
    </div>

    <div className="lastname">
    {this.props.car.lastname}
    </div>

<div className="emailid">
{this.props.car.emailid}
</div>

<div className="phonenumber">
    {this.props.car.phonenumber}
    </div>



    <div>
  <Button variant="primary" size="lg" block>
    Block level button
  </Button>
</div>





<div className="footer">
                
      <Button className="login-button"  onClick={this.props.handleCarLoginSubmit}> REG </Button>
</div>

 
    </div>
            </div>
            </div>

        );
        
    }}

export default Car;