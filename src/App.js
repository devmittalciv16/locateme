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
import { Container } from 'reactstrap';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      logged:false,
      userData:null
    };
    this.form = null;
  }

  changeState=()=>{
    this.checkToken();
  }
  checkToken=()=>{
    if(Cookie.get('token')){
      const token = Cookie.get('token');
      const query = {
        query : `
          query{
            home(token:"${token}"){
              user{
                email
                fullName
                role
                requests{
                  requester
                  request
                  id
                }
              }
              otherUsers{
                base64feature
                email
                role
                fullName
              }
            }
          }
        
        `
      }
      GraphQL.post('', query).then(res=>{
        console.log(res.data.data.home);
        if(res.data.data.home && res.data.data.home.user){
          
          this.setState({userData:res.data.data.home})
          this.setState({logged:true});
        }
      })
    }
  }
  validateAdmin=()=>{
    const query = {
      query:`
        query{
          validateAdmin(token:"${Cookie.get('token')}")
        }
      `
    }
    GraphQL.post('', query).then(res=>{
      console.log(res.data.data.validateAdmin);
      return res.data.data.validateAdmin;
    })
  }
  componentDidMount=()=>{
    this.checkToken();
  }
  render(){
    const comp = (
      <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {this.state.logged?
              <Home changeState={this.changeState} userData={this.state.userData}/>
              :<Login changeState={this.changeState}/>}
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/base64">
            <Base64/>
          </Route>
          <Route path="/revoke">
            {this.state.userData && this.state.userData.user.role==="ADMIN"?<Revoke userData={this.state.userData}/>
            :'You must be an admin to revoke'}
          </Route>
          <Route path="/revokeperm">
            {this.state.userData && this.state.userData.user.role==="ADMIN"?<RevokePerm userData={this.state.userData}/>
            :'You must be an admin to revoke'}
          </Route>
        </Switch>
      </BrowserRouter>
      </Container>
      
    );
    return comp;
  }
}

export default App;
