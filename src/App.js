import React from 'react';
import './App.css';
import './reset.css';
import routes from './route'
import Header from './Components/Header/Header'


function App() {
  return (
    <div className="App">
      <Header/>
      
       {routes}
    </div>
  );
}

export default App;
