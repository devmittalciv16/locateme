import React, { Component } from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Cookie from 'js-cookie';

import GraphQL from './Util/GraphQL';
import Base64 from './Components/Base64';
import Revoke from './Components/Revoke';
import RevokePerm from './Components/RevokePerm';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Board from './Board';
import fs from 'fs';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      longitude : "null",
      latitude : "null",
      time : "null",
      stamp :[]
    }
  }



  componentDidMount=()=>{
    console.log("Hii");
  }
   sleep=(ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  successHandler = async (position)=> { 

    let newelement = {
      time : new Date().toTimeString(),
      longitude:position.coords.longitude,
      latitude:position.coords.latitude
    } 
    this.setState({ 
      stamp: this.state.stamp.concat([newelement])
    })
  }; 
    
  errorHandler = function (errorObj) { 
    alert(errorObj.code + ": " + errorObj.message); 
  }; 
    
  workflow = () =>{
    navigator.geolocation.getCurrentPosition( 
        this.successHandler, this.errorHandler, 
        {enableHighAccuracy: true, maximumAge: 10000})
  }

  locate = ()=>{
    setInterval(this.workflow, 4000);
    // setTimeout(    , 1000);
  }
  showPosition = (position)=>{
    console.log("hii");
    this.setState({message : "hee"});
  }
  render(){
    const comp = (
    <div>
      <Button onClick={this.locate}>Click on this</Button>
      <div>
        {
          this.state.stamp.map(item => {
            return <ul>
              <li>{item.time}</li>
              <li>{item.longitude}</li>
              <li>{item.latitude}</li>
            </ul>
          })
        }
      </div>
    </div>
    );
    return comp;
  }
}

export default App;
