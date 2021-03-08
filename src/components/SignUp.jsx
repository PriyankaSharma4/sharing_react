import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
import { userService } from '../_services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class SignUp extends React.Component{
    
    state = { email: '', password: '', confirm: "" };
 
    handleChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value })};

    handleSubmit=(e)=>{

        e.preventDefault();
        console.log(this.state)
        debugger
      let data = localStorage.getItem('phone') !=null ? "":""
      if (this.state.password==this.state.confirm){
        let params = {
          "user":{
            email: this.state.email,
            password: this.state.password
          }
        }
        userService.SignUp(params)
        .then( (response) => {
            
            localStorage.setItem("access_token", response.data.token)
            localStorage.setItem("user_id", response.data.userId)
          window.location.href="/"
        
          
        }).catch((error) =>{
          this.setState({ otp: '' })
        
        
        });

      }else{
        toast.error("Confirm Password did't matched.")
        this.setState({ otp: '' })
      }
    }

  

    

	render() {

    return ( 
      <div className="row">  
        <ToastContainer />

        <div className="col-4"></div>
        <div className="wrapper col-4">
            <form className="form-signin" onSubmit={(e)=>{this.handleSubmit(e)}}>       
            <h2 className="form-signin-heading">Please Register</h2>
            <div className="form-group">

            <input type="email" className="form-control" name="email" placeholder="Email Address" required autofocus=""  onChange={(e)=>{this.handleChange(e)}}/>

            </div>
            <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e)=>{this.handleChange(e)}} minLength={6} required/>  
            </div>   

               <div className="form-group">
            <input type="password" className="form-control" name="confirm" placeholder="Confirm Password" onChange={(e)=>{this.handleChange(e)}} minLength={6} required/>  
            </div>   
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>   
            </form>
            <div className="redirect">
                <a href='/'>Login</a>
            </div>
        </div>
        <div className="col-4"></div>
       
      </div>
    	)
  }
}


export default (SignUp);
