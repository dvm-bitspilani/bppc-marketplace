import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "../axios-instance";

import { GoogleLogin, GoogleLogout } from "react-google-login";
// import { navigate } from "@reach/router";
import * as actions from "../store/actions/index";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "http2";

const initialState = {
  username: "",
  password: ""
};
class Login extends Component {
  state = {
    ...initialState,
    isAuthenticated: false
  };

  componentDidMount() {
    console.log(this.props.navigate);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.onAuth(this.state.username, this.state.password);
    this.setState({
      ...initialState
    });
  };

  handleGoogleLogin = response => {
    // console.log(response.tokenObj.id_token);
    if (response.tokenObj !== null) {
      this.props.onGoogleAuth(response.tokenObj.id_token);
    } else {
      console.log("google auth failed");
      window.alert("Google auth failed");
    }
  };

  handleGoogleLogout = response => {
    console.log(response);
    window.alert("Logged out of your account!");
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login for 2019 batch</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="person" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="dark"
                            className="px-4"
                            style={{ color: "white" }}
                            onClick={this.handleSubmit}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button
                            color="link"
                            className="px-0"
                            style={{ color: "#343a40" }}
                          >
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-dark py-5 d-md-down-none sm-12">
                  <CardBody className="text-center">
                    <div>
                      <h2>Login</h2>
                      <p>Students with bits-email can login directly here</p>
                      <GoogleLogin
                        clientId="1046329633263-d63770hr5scfj5mrgkgce4c0flj2iokh.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.handleGoogleLogin}
                        onFailure={this.handleGoogleLogin}
                        cookiePolicy={"single_host_origin"}
                      />
                      <GoogleLogout
                        buttonText="Logout"
                        onLogoutSuccess={this.handleGoogleLogout}
                      />
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.auth(username, password)),
    onGoogleAuth: (id_token) => dispatch(actions.googleAuth(id_token))
  };
};

export default connect(null, mapDispatchToProps)(Login);
 