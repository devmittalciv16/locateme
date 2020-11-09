import React, {Component} from 'react';
import GraphQL from '../Util/GraphQL';
import Cookie from 'js-cookie';
import {Button, Input, Label, Form, Card, CardBody } from 'reactstrap';

class Base64 extends Component{
    constructor(props){
        super(props);
        this.state = {
            res:{
                message:"",
                result:""
            }
        }
    }
    encode=(e)=>{
        e.preventDefault();
        let queryString = document.getElementById("query").value;
        let token = Cookie.get('token');
        const query = {
            query:`
                query{
                    convertToBase64(token:"${token}" toConvert:"${queryString}"){
                        message
                        result
                    }
                }
            `
        }
        GraphQL.post('', query).then(res=>{
            this.setState({res:res.data.data.convertToBase64});
            console.log(res.data.data);
        })
    }
    render(){
        const elem = (
            <>
            <Form>
                <Label htmlFor="query">query</Label>
                <Input id="query"></Input>
                <br/>
                <Button onClick={this.encode}>Encode</Button>
            </Form>
            <Card>
                <CardBody>
            <h3>{this.state.res.message}</h3>
            <h4> Encoded string is : {this.state.res.result}</h4>
            </CardBody>
            </Card>
            </>
        )

        return elem;
    }
}

export default Base64;