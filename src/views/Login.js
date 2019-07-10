import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
// import { Link } from "@reach/router";
import axios from "axios";
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
import styles from "./../css-modules/login.module.css";

const initialState = {
  username: "",
  password: ""
};
class Login extends Component {
  state = initialState;

  componentDidMount() {
    console.log(this.props);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let authData = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("https://market.bits-dvm.org/api/login/", authData)
      .then(response => {
        console.log("connected!");
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState(initialState);
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
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login for 2019 batch</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {/* <Link to="/dashboard">
                            <Button
                              color="dark"
                              className="px-4"
                              style={{ color: "white" }}
                            >
                              Login
                            </Button>
                          </Link> */}
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
                      <Button
                        color="light"
                        className="mt-3"
                        active
                        tabIndex={-1}
                        onClick={this.handleSubmit}
                      >
                        Login
                      </Button>
                      {/* <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      /> */}
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

export default Login;
