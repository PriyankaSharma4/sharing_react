import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
import { userService } from '../_services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {Header} from  "./common/Header"


export class Dashboard extends React.Component{
    
    state = { shared_by_me: [], shared_by_others: [] };
   

      componentWillMount(){

        userService.dashboard()
        .then( (response) => {

         this.setState({shared_by_me: response.data.shared_by_me , shared_by_others: response.data.shared_by_others})
        
          
        }).catch((error) =>{
        
        
        });
       
    }
   
	render() {

    return ( 
     <>
     <Header></Header>
     <br></br>
     <div class="container"><h1>Welcome User </h1></div>
     <br></br>
    <div id="exTab1" class="container">	
        <ul  class="nav nav-pills">
            <li class="active">
                <a  href="#1a" data-toggle="tab">Location Shared By Me</a>
            </li>
            <li><a href="#2a" data-toggle="tab">Location Shared By Others</a>
            </li>
           
        </ul>

                <div class="tab-content clearfix">
                <div class="tab-pane active" id="1a">
            {this.state.shared_by_me.length==0 && <h3>No Location Found</h3>}
            {this.state.shared_by_me.length>0 && this.state.shared_by_me.map((value, key)=>{
            
              return(
                <>
                <h3>{value.address}</h3>
                <h3><a href={"/showmap?lat="+value.lat+"&lng="+value.long}>view on map</a></h3>
</>
              )
            }) }

                    </div>
                    <div class="tab-pane" id="2a">
                    {this.state.shared_by_others.length==0 && <h3>No Location Found</h3>}
            {this.state.shared_by_others.length>0 && this.state.shared_by_others.map((value, key)=>{
            
              return(
                <>
                <h3>{value.location_share.address}</h3>
                <h3><a href={"/showmap?lat="+value.location_share.lat+"&lng="+value.location_share.long}>view on map</a></h3>
                </>
              )
            }) }                    </div>
          
                </div>
    </div>




     </>
    	)
  }
}


export default (Dashboard);
