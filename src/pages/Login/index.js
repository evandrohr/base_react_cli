import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message : this.props.location.state ? this.props.location.state.message : '',
    }
  }

  signIn = () => {
    const data = { email: this.email, password: this.password }
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch('http://localhost:3000/api/v1/authenticate', requestInfo)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error("Invalid Login!")
    })
    .then(auth_token => {
      localStorage.setItem('auth_token', auth_token);
      this.props.history.push("/admin");
      return;
    })
    .catch(e => {
      this.setState({ message: e.message });
    });
  }

  render() {
    return(
      <div className="col-md-6">
        <Header title="Login JWT Client"/>
        <hr className="my-3"/>
        {
          this.state.message !== '' ? (
            <Alert color="danger" className="text-center"> {this.state.message} </Alert>
          ) : ''
        }
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" id="email" onChange={e => this.email = e.target.value}  placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="Password" />
          </FormGroup>
          <Button color="primary" block onClick={this.signIn}> Submit </Button>
        </Form>
      </div>
    );
  }
}