import React, {useEffect,useContext, useState, Component} from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from 'react-router'
// import OtpInput from 'react-otp-input';
// import { userService } from '../_services';
import { MDBDataTableV5 } from 'mdbreact';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {Header} from  "./common/Header"
import { userService } from '../_services';


export class UserDetail extends React.Component{
    
    state = { id: "",users:[], username: "" };

    componentWillMount(){

        let query = new URLSearchParams(window.location.search);
        this.state = {
            id: query.get("id")
        }
         userService.public_location(this.state.id)
        .then( (response) => {

            this.setState({ users: response.data.public_locations, username: response.data.user })

          
        }).catch((error) =>{
        
        
        });
       
    }


	render() {
        let data_table=
        {    columns: [
            {
              label: 'Address',
              field: 'email',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Email',
              },
            },
              {
                label: 'Actions',
                name: "Action",
                field: 'action',
                sort: 'disabled',
                width: 100,
              },
            ],
          rows:[
              
          ]
      }

      let  mappedUser =[]
      this.state.users && this.state.users.length>0 && this.state.users.map((key, value)=>{
          
         let hsh = {}
         hsh["email"] = key.address
         hsh["action"] = <div> 
         <a href={'/user?id='+key.id}> <i class="fas fa-eye"></i> </a>
         </div>
         mappedUser.push(hsh)
         
 
       })
 
       data_table["rows"]=mappedUser

    return ( 
     <>
     <Header></Header>
     <div className="row public">
         <br></br>
     <div className="col-6"><h5>Here is the {this.state.username} public location</h5></div>
     </div>
     <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={data_table}
                    
                    
                    proCheckboxes
                    filledCheckboxes
                    proSelect
                />
     




     </>
    	)
  }
}


export default (UserDetail);
