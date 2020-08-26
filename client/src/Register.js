import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:"",
            password_confirm:"",
            email:"",
            name:"",
            registrationErrors:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        const{
            username,
            password,
            email,
            name
        } = this.state;
        axios.post("http://localhost:4000/register",{
            user:{
                username: username,
                password: password,
                email: email,
                name: name
            }
        },
        {   withCredentials:true }
        ).then(res =>{
            console.log("regis",res);
        }).catch(err =>{
            console.log("regis",err);
        })
        e.preventDefault();
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <label>Password Confirm</label>
                    <input type="password" name="password_confirm" placeholder="password_confirm" value={this.state.password_confirm} onChange={this.handleChange} required/>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
                    <button type="submit">Register</button> 
                </form>
            </div>
        )
    }
}
