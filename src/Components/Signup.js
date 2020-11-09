import React, {Component} from 'react';
import GraphQL from '../Util/GraphQL';
import {Button, Label, Form, Input} from 'reactstrap';

class Signup extends Component{
    
    handleSubmit=(e)=>{
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const fullName = document.getElementById("fullName").value;
        const query = {
            query:`
                mutation{
                    signUp(email:"${email}", password:"${password}", fullName:"${fullName}")
                }
            `
        }
        GraphQL.post('', query).then(res=>{
            console.log(res.data.data);
        })
    }
    render(){
        
        const form = (
            <>
            <Form>
                <Label htmlFor="email">email</Label>
                <Input type="text" id="email"></Input>
                <br/>
                <Label htmlFor="password">password</Label>
                <Input id="password"></Input>
                <br/>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName"></Input>
                <Button onClick={this.handleSubmit}>Signup</Button>
            </Form>
            </>
        )
        return form;
    }
}

export default Signup;