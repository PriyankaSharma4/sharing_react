import React, {useEffect,useContext, useState} from 'react';

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import { Home } from "../src/components/Login";
import { SignUp } from "../src/components/SignUp";
import { Dashboard } from "../src/components/Dashboard";
import { Users } from "../src/components/Users";
import { UserDetail } from "../src/components/UserDetail";
import { Showmap } from "../src/components/Showmap";
import { LocationShare } from "../src/components/LocationShare";


function App() {
  let access_token = localStorage.getItem("access_token");

  return (
    <Router>
  
    {access_token ? 
      <Switch>
       <Route exact path="/" component={Dashboard} />
       <Route exact path="/users" component={Users} />
       <Route exact path="/user" component={UserDetail} />
       <Route exact path="/location_share" component={LocationShare} />
       <Route exact path="/showmap" component={Showmap} />


      </Switch>
      :
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign_up" component={SignUp} />
      <Redirect to="/" />
      </Switch>
    }
      
     
   </Router>
  );
}

export default App;
