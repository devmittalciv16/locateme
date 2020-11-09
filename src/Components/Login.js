import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cookie from 'js-cookie';
import {Link} from 'react-router-dom';
import GraphQL from "../Util/GraphQL";
import {Input, Button, Form, Label} from 'reactstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.num = 0;
    }
    temp=()=>{
        document.location.reload();
    }
    handleSubmitGraphql=(e)=>{
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const query = {
            query : `
                query{
                    login(email:"${email}" password:"${password}")
                }
            `
        }
        GraphQL.post('', query).then((res)=>{
            console.log(res.data.data.login);
            var token = res.data.data.login;
            let hour = 1/24;
            let timegap = 5.5*hour
            Cookie.set('token', token, {expires:1*hour + timegap});
            this.temp();
        })
    }
    render(){
        const form = (
            <>
            <h3 >Welcome Existing User</h3>
            <Form>
                <Label htmlFor="email">email</Label>
                <Input id="email"></Input>
                <br/>
                <Label htmlFor="passwordd">password</Label>
                <Input id="password"></Input>
                <Button onClick={this.handleSubmitGraphql}>Login</Button>
            </Form>
            <hr/>
            New here?
            <Button href="/signup">signup</Button>
            </>
        )
        return form;
    }
}
export default Login;