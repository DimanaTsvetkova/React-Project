import React, { Component } from 'react';
import {Redirect} from 'react-router';
import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName:"",
      email:"",
      password:"",
      imageUrl:"data:image/jpeg;base64,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",
    }
    this.setCreditentials = props.setCreditentials.bind(this);
  }
  render() {
    if(localStorage.getItem('isLogged')){
      return <Redirect to="/shop/products"/>
    }
    return (
      <main className="cred-form">
      <div className="reg-form">
        <form onSubmit={(e)=>
       this.props.onSubmit(e,this.state,'register')
      }>
      <h1>Register</h1>
          <input className="login" onChange={this.setCreditentials} type="text" name="username" placeholder="Username" />
          <input className="login" onChange={this.setCreditentials} type="text" name="fullName" placeholder="Name" />
            <input className="login" type="text" onChange={this.setCreditentials} name="imageUrl" placeholder="Profile Picture URL"/>
          <input className="login" onChange={this.setCreditentials} type="password" name="password" placeholder="******" />
          <input className="login-btn" type="submit" value="Register" />
        </form>

      </div>
      </main>
    );
  }
}

export default Register;
