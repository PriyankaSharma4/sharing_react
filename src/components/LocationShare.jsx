import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
// import { userService } from '../_services';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Multiselect } from 'multiselect-react-dropdown';

import Autocomplete from 'react-google-autocomplete';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {Header} from  "./common/Header"
import { userService } from '../_services';


export class LocationShare extends React.Component{
    
   
    state = { id: "",users:[], selected_users:[], address: "", lat: "", lng: "", is_public: false};

    componentWillMount(){

         userService.get_all_users()
        .then( (response) => {

            response.data.users.map((key, value)=>{
                let hsh = {}
                hsh = {name: key.email, id: key.id}
                this.state.users.push(hsh)
            })

            this.setState({ users: this.state.users})

        }).catch((error) =>{
        
        
        });
       
    }



    handleChangeCheck = (event) => {
        event.target.checked &&  this.setState({selected_users: []})
        this.setState({ [event.target.name]:event.target.checked       
    })};

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value      
    })};
    
 

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.selected_users.length==0 && !this.state.is_public){
            toast.error("Either select users or make your location public to share.")
        }else{
            let hash = {}
            hash["location"]={
              address: this.state.address, lat: this.state.lat, long: this.state.lng, is_public: this.state.is_public

            }
            hash["selected_users"]=   this.state.selected_users
        userService.locationShare(hash)
        .then( (response) => {

        window.location.href="/"
        
          
        }).catch((error) =>{
        
        
        });

        }
        
      
    }

    onSelect=(selectedList, selectedItem) =>{
        this.setState({selected_users: selectedList})
        
    }
    
    onRemove=(selectedList, removedItem) =>{
        this.setState({selected_users: selectedList})
        
    }

  

     handleChangeadd = (e) => {
    


this.setState({ lat: e.geometry.location.lat(), lng :e.geometry.location.lng()})
        
           this.setState({address: e.formatted_address})
        //   formData.address = e.description
        // formData.latitude = e.description
        // formData.longitude = e.description
        
       };

	render() {
        

    return ( 
     <>
     <Header></Header>
     <ToastContainer />

     
     <div className="row">  
        {/* <ToastContainer /> */}

        <div className="col-2"></div>
        <div className="wrapper col-8">
        <h2 className="form-signin-heading">Add location to share</h2>

            <form className="form" onSubmit={(e)=>{this.handleSubmit(e)}}>       
            <div className="form-group ">
             <label>Enter location you want to share</label>

            

<Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
        this.handleChangeadd(place)
      console.log(place);
    }}
    types={['(regions)']}
    componentRestrictions={{country: "ru"}}
/>
            </div>
            {!this.state.is_public &&<div className="form-group">
            <label>Select users</label>
                <Multiselect
                options={this.state.users} // Options to display in the dropdown
                selectedValues={this.state.selected_users} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />
            </div>}    
                <label className="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="is_public" checked={this.state.is_public} onChange={(e)=>{this.handleChangeCheck(e)}} />  Is public
                </label>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Share Location</button>   
            </form>
          
        </div>
        <div className="col-2"></div>
       
      </div>



     </>
    	)
  }
}


export default (LocationShare);
