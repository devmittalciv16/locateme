import React, {Component} from 'react';
import {Button} from 'reactstrap';
import GraphQL from '../Util/GraphQL';
import Cookie from 'js-cookie';

const Request = Object.freeze({0:"CHANGEPERM", 1:"BASE64"});

class RevokePerm extends Component{
    constructor(props){
        super(props);
    }
    revokePerm = (email, perm)=>{
        const query = {
            query:`
                mutation{
                    revokePerm(token:"${Cookie.get('token')}"
                        email:"${email}" request:${Request[perm]})
                }
              
            `
        }
        GraphQL.post('', query).then(res=>{
            console.log(res.data);
            document.location.reload();
        })
    }
    render(){
        let elem = this.props.userData.otherUsers.map((elem, i)=>{
            
            return(
                <div key={i}>
                    <h3 >{elem.fullName} </h3>
                    <h5>{elem.email}</h5>
                    {elem.role==="ADMIN"?<Button onClick={()=>this.revokePerm(elem.email, 0)}>Revoke Admin Permission</Button>:null}
                    {elem.base64feature?<Button onClick={()=>this.revokePerm(elem.email, 1)}>Revoke Base 64 Feature</Button>:null}
                    {(!elem.base64feature && elem.role!=="ADMIN")?<h4>He doesn't have any special permisions</h4>:null}
                    <hr/>
                </div>
            )
        }) 
        return elem;
    }
}

export default RevokePerm;