import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";
import axios from "axios";

// import { redirectTo } from "@reach/router";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
  repeatpasswordError: "",
  redirectToDashboard: true
};

class Register extends Component {
  state = initialState;
  constructor(props){
    super(props);
    this.state={
      yearOfStudy: 2019,
      dualDegree: false,
      singleDegree: true
    }
    this.yearOfStudy = this.yearOfStudy.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let repeatpasswordError = "";

    if (!this.state.username) {
      usernameError = "username cannot be blank";
    }

    if (!this.state.email) {
      emailError = "email cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "password cannot be blank";
    }

    if (this.state.password !== this.state.repeatpassword) {
      repeatpasswordError = "must be same";
      this.setState(repeatpasswordError);
      return false;
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (emailError || usernameError || passwordError) {
      this.setState({ emailError, usernameError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      axios
        .post("url", this.state)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
      // clear form
      this.setState(initialState);
    }
  };
  yearOfStudy = e =>{
    // console.log(e.target.value);
    this.setState({yearOfStudy : e.target.value},function(){
      console.log(this.state.yearOfStudy);
      if(this.state.yearOfStudy != 2019 && this.state.dualDegree){
        this.setState({
          singleDegree:true,
          dualDegree:true
        });
      }
      else{
        if(this.state.yearOfStudy == 2019 && this.state.dualDegree){
          this.setState({
            singleDegree:false,
            dualDegree:true
          });
        }
      }
    });
  };
  showBothBranch = e => {
    if(e.target.value == "Single Degree"){
        this.setState({
          singleDegree:true,
          dualDegree:false
        });
    }
    else if(e.target.value == "Dual Degree"){
        if(this.state.yearOfStudy == 2019){
          this.setState({
            singleDegree:false,
            dualDegree:true
          })
        }else{
          this.setState({
            singleDegree:true,
            dualDegree:true
          })
        }
      }
    else{
        
      } 
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Tell Us About Yourself</h1>
                    <p className="text-muted">Please fill all mentioned fields</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person"></ion-icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      >
                      </Input>
                    </InputGroup>

                    <FormGroup>
                          <div style={{paddingLeft: "50px"}}>
                            <CustomInput inline type="radio" id="exampleCustomRadio" name="customRadio" label="Male" />
                            <CustomInput inline type="radio" id="exampleCustomRadio2" name="customRadio" label="Female" />
                          </div>
                    </FormGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="call"></ion-icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="Phone-Number"
                        id="exampleNumber"
                        placeholder="Phone number"
                      />
                    </InputGroup>

                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><ion-icon name="mail"></ion-icon></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="finger-print" size="small"></ion-icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="done-all"></ion-icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="repeatpassword"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        onChange={this.handleChange}
                      />
                    </InputGroup> */}
                    
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="calendar"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                      type="select"
                      id="exampleCustomSelect"
                      name="year of study"
                      onChange={this.yearOfStudy}
                      >
                      <option value="" >Select your year of study</option>
                      <option>2019</option>
                      <option>2018</option>
                      <option>2017</option>
                      <option>2016</option>
                      <option>2015</option>
                      <option>2014</option>
                      <option>2013</option>
                      </CustomInput>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="home"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                      type="select"
                      id="exampleCustomSelect"
                      name="customSelect"
                      >
                      <option value="">Select your Hostel.</option>
                      <option>SR</option>
                      <option>SR</option>
                      <option>SR</option>
                      <option>SR</option>
                      <option>SR</option>
                      </CustomInput>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="home"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="Phone Number"
                        id="exampleNumber"
                        placeholder="Enter Room No"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="book"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                      type="select"
                      id="exampleCustomSelect"
                      name="customSelect"
                      onChange={this.showBothBranch}
                      >
                      <option value="">Choose your degree type</option>
                      <option>Single Degree</option>
                      <option>Dual Degree</option>
                      </CustomInput>

                    </InputGroup>
                    {(this.state.singleDegree)?(
                      <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          >
                        <option value="">Enter your Single Degree Branch.</option>
                        <option>A1 - B.E. Chemical</option>
                        <option>A2 - B.E. Civil</option>
                        <option>A3 - B.E. Electrical and Electronics</option>
                        <option>A4 - B.E. Mechanical</option>
                        <option>A5 - B.Pharma</option>
                        <option>A7 - B.E. Computer Science</option>
                        <option>A8 - B.E. Electronics and Instrumentation</option>
                        <option>AB - B.E. Manufacturing</option>
                        </CustomInput>
                    </InputGroup>
                    ):(
                      null
                    )
                    }

                    {(this.state.dualDegree)?(
                      <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          >
                        <option value="">Enter your dual Branch.</option>
                        <option>B1 - M.Sc. Biological Sciences</option>
                        <option>B2 - M.Sc. Chemistry</option>
                        <option>B3 - M.Sc. Economics</option>
                        <option>B4 - M.Sc. Mathematics</option>
                        <option>B5 - M.Sc. Physics</option>
                        </CustomInput>
                    </InputGroup>
                    ):(
                      null
                    )
                    }
                    <Button color="success" block onClick={this.handleSubmit}>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
