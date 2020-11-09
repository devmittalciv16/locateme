import React, {Component} from 'react';
import {Button} from 'reactstrap';
import GraphQL from '../Util/GraphQL';
import Cookie from 'js-cookie';

class Revoke extends Component{
    constructor(props){
        super(props);
    }
    revoke=(email)=>{
        console.log(email);
        const query = {
            query:`
                mutation{
                    revoke(token:"${Cookie.get('token')}", email:"${email}")
                }
            `
        }
        GraphQL.post('', query).then(res=>{
            console.log(res.data.data.revoke);
            document.location.reload();
        })
        
    }

    render(){
        let elem = this.props.userData.otherUsers.map((elem, i)=>{

            return(
                <div key={i}>
                    <h3 >{elem.fullName} </h3>
                    <h5>{elem.email}</h5>
                    <Button onClick={()=>this.revoke(elem.email)}>Revoke this Account</Button>
                    
                    <hr/>
                </div>
            )
        }) 
        return elem;
    }
}
export default Revoke;