import React, { Component } from 'react';
import { Link } from "@reach/router";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import styles from "./../css-modules/login.module.css";
class Login extends Component {
  componentDidMount() {
    console.log(this.props);
  }

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
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                         <Link to="/dashboard">                       
                            <Button color="dark" className="px-4" style={{color: "white"}}>Login</Button>
                         </Link>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" style={{color: "#343a40"}}>Forgot password?</Button>
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
                      <Link to="/dashboard">
                        <Button color="light" className="mt-3" active tabIndex={-1}>Login</Button>
                      </Link>
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
