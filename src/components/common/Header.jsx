import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
// import { userService } from '../_services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class Header extends React.Component{
    
    state = { email: '', password: '' };
 
    handleChange = (state) => this.setState({ state });

    resendOtp=()=>{


      let data = localStorage.getItem('phone') !=null ? "":""
      if (data!=""){
        // let code = data.countryCallingCode
        // // setUser({country_code: code, phone_number: data.nationalNumber, error:0})
        // let params = {
        //   "user":{
        //     phone_number: data.nationalNumber,
        //     country_code: code
        //   }
        // }
        // userService.login(params)
        // .then( (response) => {

        //   toast.success("OTP send successfully")
        //   this.setState({ otp: '' })
        
          
        // }).catch((error) =>{
        //   this.setState({ otp: '' })
        
        
        // });

      }else{
        // toast.error("Please enter mobile number first.")
        this.setState({ otp: '' })
      }
    }

  

    

	render() {

    return ( 
<header>
         <div className="container">
            <div className="row">
               <div className="col-md-12 col-sm-12 col-lg-12 col-xl-3">
                  <div className="logo">
                     <a href="/" title="logo"> Location Sharing App</a>
                  </div>
                  <div className="mob-menu">
                     <span>
                        <i className="fa fa-bars"></i>
                     </span>
                  </div>
               </div>
               <div className="col-md-12 col-sm-12 col-lg-12 col-xl-9">
                  <div className="main-menu">
                     <ul className="nav">
                     <li><a href="/users"> Users </a> </li>
                           <li><a href="/location_share"> Share Location </a> </li>
                        </ul>
                     <ul className="right-nav">
                         {/* <li><a href="#"> <i className="fa fa-user"></i> Log in </a> </li> */}
                       <li className="active"> <a href="#" onClick={()=>{localStorage.clear(); window.location.href="/"}}> <i className="fa "></i> Logout</a> </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </header>
    	)
  }
}


export default (Header);
