import React, {Component} from 'react';
import Cookie from 'js-cookie';

import { Link} from 'react-router-dom';
import {Button, Row, Col, Navbar, Jumbotron} from 'reactstrap';
import GraphQL from '../Util/GraphQL';
const Request = Object.freeze({0:"CHANGEPERM", 1:"BASE64"});
class Home extends Component{
    constructor(props){
        super(props);

    }
    handleLogout=()=>{
        Cookie.remove('token');
        this.temp();
    }

    askPerm=(email, k)=>{
        const token = Cookie.get('token');
        const owner = email;
        let request = Request[k];
        const query = {
            query:` 
                mutation{
                    makeRequest(token:"${token}" owner:"${owner}" request:${request})
                }
            `
        }
        GraphQL.post('', query).then(res=>{
            console.log(res.data.data);
            
        })
    }
    acceptPerm=(id)=>{
        const token = Cookie.get('token')
        const query = {
            query:`
                mutation{
                    acceptRequest(token:"${token}", id:${id})
                }
            `
        }
        GraphQL.post('', query).then(res=>{
            console.log(res.data.data);
            this.temp();
        })
    }
    temp=()=>{
        document.location.reload();
    }
    render(){
        let subElem;
        if(this.props.userData.user.role==="GUEST"){
            subElem = (
                <>
                <h3>You can ask them about permissions</h3>
                <hr/>
                {this.props.userData.otherUsers.map((elem, i)=>{
                    if(elem.role==="ADMIN")return(
                        <div key={i}>
                            <h3 >{elem.email}</h3>
                            <h3 >{elem.role}</h3>
                            <Button onClick={()=>this.askPerm(elem.email, 0)}>Ask Admin Role</Button>
                            <Button onClick={()=>this.askPerm(elem.email, 1)}>Ask base64 feature</Button>
                            <hr/>
                        </div>
                    )
                    return null;
                })}
                </>
            )

        }else{
            let temp;
      
            subElem = (
                <>
                <h3>You can accept their requests</h3>
                <hr/>
                {this.props.userData.user.requests.map((elem, i)=>{
                    if(elem.request === "CHANGEPERM")temp="Admin Role";
                    else temp = "Base64 encode feature"
                    return(
                        <div key={i}>
                            <h3 >{elem.requester} has requested {temp}</h3>
                            <Button onClick={()=>this.acceptPerm(elem.id)}>Accept Request</Button>
                            
                            <hr/>
                        </div>
                    )
                })}
                </>
            )
        }
       
        const elem = (
            <>
            <Jumbotron >
            <Row>
                <Col xs="12" sm="6">
                <h2>You are {this.props.userData.user.fullName}, {this.props.userData.user.role}</h2>
                </Col>
                <Col xs="12" sm="6">
                <Button onClick={this.handleLogout}>Log out</Button>
                <Button href="/base64">Base64 Feature</Button>
                <Button href="/revoke">Revoke an account</Button>
                <Button href="/revokeperm">Revoke Permission</Button>
                <hr/>
                </Col>
            </Row>
            </Jumbotron>
            
            {subElem}
            </>
        )
        return elem;
    }
}

export default Home;