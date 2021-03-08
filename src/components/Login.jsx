import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
import { userService } from '../_services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class Home extends React.Component{
    
    state = { email: '', password: '' };
 
    handleChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value       })};

    handleSubmit=(e)=>{

        e.preventDefault();
    
        let params = {
            "user":{
              email: this.state.email,
              password: this.state.password
            }
          }
        userService.login(params)
        .then( (response) => {
            localStorage.setItem("access_token", response.data.token)
            localStorage.setItem("user_id", response.data.userId)
          window.location.href="/"
        
          
        }).catch((error) =>{
        if (error.response && error.response.status ){
            toast.error(error.response.data.error )
        }
        
        });

      }
    

  

    

	render() {

    return ( 
      <div className="row">  
        <ToastContainer />

        <div className="col-4"></div>
        <div className="wrapper col-4">
        <form className="form-signin" onSubmit={(e)=>{this.handleSubmit(e)}}>     
            <h2 className="form-signin-heading">Please login</h2>
            <div className="form-group">

            <input type="email" className="form-control" name="email" placeholder="Email Address" onChange={(e)=>{this.handleChange(e)}} required autofocus="" />

            </div>
            <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password"  onChange={(e)=>{this.handleChange(e)}} minLength={6} required/>  
            </div>    
                {/* <label className="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                </label> */}
            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
            </form>
            <div className="redirect">
                <a href='/sign_up'>Sign Up</a>
            </div>
        </div>
        <div className="col-4"></div>
       
      </div>
    	)
  }
}


export default (Home);
