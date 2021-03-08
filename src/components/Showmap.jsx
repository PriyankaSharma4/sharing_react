import React, {useEffect,useContext, useState, Component} from 'react';
import { MDBDataTableV5 } from 'mdbreact';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {Header} from  "./common/Header"
import { userService } from '../_services';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{height: "100px"}}><i class="fa fa-map-marker" aria-hidden="true"></i>
{text}</div>;


export class Showmap extends React.Component{
    
    state = { location: {}};

    componentWillMount(){

        let query = new URLSearchParams(window.location.search);
        let locationData = {
            lat: parseFloat(query.get("lat")),
            lng: parseFloat(query.get("lng"))
        }
     

        this.setState({location: locationData})
     
       
    }


	render() {

    return ( 
     <>
     <Header></Header>
     <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={this.state.location}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={parseFloat(this.state.location.lat)}
            lng={parseFloat(this.state.location.lng)}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
     




     </>
    	)
  }
}


export default (Showmap);
