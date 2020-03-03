import React from 'react'
import {Switch, Route} from 'react-router-dom'
import App from "./App"
import Login from './Components/Login/Login';
import Store from './Components/Store/Store';
import Cart from './Components/Cart/Cart';
import About from './Components/About/About'
import Appointment from './Components/Appointment/Appointment';

export default( 
       <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/store" component={Store}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/about" component={About}/>
        <Route path="/appointments" component={Appointment}/>
       </Switch>
  );


