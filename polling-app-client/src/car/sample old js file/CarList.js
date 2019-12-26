import React, { Component } from 'react';

import { getCar, createCar, carLogin } from '../util/APIUtils';

import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { withRouter } from 'react-router-dom';


class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [], 
            page: 0,              
            isLoading: false
        };
        
        this.loadCarList  = this.loadCarList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadCarList(page = 0)  {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED') {
                promise = createCar(this.props.username, page);    
            }  else if (this.props.type === 'USER') 
            {
                promise = getCar(this.props.username, page);                          
            }

       if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {
            const cars = this.state.cars.slice();     
            const currentcarLogin = this.state.currentcarLogin.slice();    

            this.setState({
                cars: cars.concat(response.content),
                page: response.page,                             
                currentcarLogin: currentcarLogin.concat(Array(response.content.length).fill(null)),
                isLoading: false
            } )
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
        } }

    componentDidMount() 
     { 
        this.loadCarList();
    }
        
                          
   componentDidUpdate(nextProps) 
   {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                cars: [],
                page: 0,
                isLoading: false
            });    
            this.loadCarList();
        }
    }

    handleLoadMore() {
        this.loadCarList(this.state.page + 1);
    }
   
    handlecarLoginChange(event, carIndex) 
     {
        const currentcarLogin = this.state.currentcarLogin.slice();
        currentcarLogin [carIndex] = event.target.value;

       this.setState({
            currentcarLogin: currentcarLogin
        });
    }
   
    handlecarLoginSubmit(event, carIndex)
     {
        event.preventDefault();
        if(!this.props.isAuthenticated) 
        {
            this.props.history.push("/login");
            notification.info({
                message: 'USEr App',
                description: "Please login to .",          
            });
            return;
        }

       const car = this.state.cars[carIndex];

        const loginData = 
        {
            carId: car.id
        };

        carLogin(loginData)
        .then(response => {
            const cars = this.state.cars.slice();
            cars[carIndex] = response;
            this.setState({
                cars: cars
            });        
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to ');    
            } else {
                notification.error({
                    message: ' App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });                
            }
        });
    } 
    render()  
    {
        const carViews = [];
        this.state.cars.forEach((car, carIndex) => {
            carViews.push(<Car 
                key={car.id} 
                car={car}
        handlecarLoginSubmit={(event) => this.handlecarLoginSubmit(event, carIndex)}
                />)    

    });

      
      return (
            <div className="container">
           {carViews}
          {
           !this.state.isLoading && this.state.cars.length === 0 ?  (
                        <div className="no-found">
                            <span>Not Found.</span>
                        </div>    
                    ): null
                }  
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }              
                {
                    this.state.isLoading ? 
                    <LoadingIndicator />: null                     
                }
            </div>
        );
    }
}

export default withRouter(CarList);