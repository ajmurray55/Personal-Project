import React from 'react';
import './App.css';
import './reset.css';
import {Switch, Route} from 'react-router-dom';

import Header from './Components/Header/Header'
import Login from './Components/Login/Login';
import Store from './Components/Store/Store';
import Cart from './Components/Cart/Cart';
import About from './Components/About/About'
import Appointment from './Components/Appointment/Appointment';

function App() {
  return (
    <div className="App">
      <Header/>
       <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/store" component={Store}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/about" component={About}/>
        <Route path="/appointment" component={Appointment}/>
       </Switch>
    </div>
  );
}

export default App;
