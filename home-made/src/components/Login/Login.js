import React, { Component } from 'react';
import './login.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
    }
    this.setCreditentials = props.setCreditentials.bind(this);
  } 
  render() {
    return (
      <main className="cred-form">
      <div className="container">
        <form onSubmit={(e)=>
       this.props.onSubmit(e,this.state,"login")
      }>
      <h1>Login</h1>
          <input className="login" onChange={this.setCreditentials} type="text" name="username" placeholder="Username" />
          <input className="login" onChange={this.setCreditentials} type="password" name="password" placeholder="******" />
          <input className="login-btn" type="submit" value="Login" />
        </form>

      </div>
      </main>
    );
  }
}

export default Register;
