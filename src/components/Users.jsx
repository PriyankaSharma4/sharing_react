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


export class Users extends React.Component{
    
    state = { users:[] };

    componentWillMount(){
         userService.get_all_users()
        .then( (response) => {

        
            this.setState({ users: response.data.users})

          
        }).catch((error) =>{
        
        
        });
       
    }




    
 
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
        let data_table=
        {    columns: [
            {
              label: 'Email',
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
         hsh["email"] = key.email
         hsh["action"] = <div> 
         <a href={'/user?id='+key.id}> <i class="fas fa-eye"></i> </a>
         </div>
         mappedUser.push(hsh)
         
 
       })
 
       data_table["rows"]=mappedUser

    return ( 
     <>
     <Header></Header>
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


export default (Users);
