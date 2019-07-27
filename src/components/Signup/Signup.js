import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
// import { Router, Link } from "@reach/router";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  CustomInput
} from "reactstrap";

const axios = require("axios");

// import { redirectTo } from "@reach/router";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  hostel: "",
  single_branch: "",
  dual_branch: "",
  phone: "",
  repeatpassword: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
  repeatpasswordError: "",
  isPasswordCorrect:false,
  redirectToDashboard: true
};

class Register extends Component {
  state = initialState;
  constructor(props) {
    super(props);
    this.state = {
      yearOfStudy: 2019,
      dualDegree: false,
      singleDegree: true,
      gender: "none",
      isPasswordCorrect: "none",
      password: ""
    };
    this.yearOfStudy = this.yearOfStudy.bind(this);
    this.gender = this.gender.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
  }
  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      // console.log(this.state)
    );
    // console.log(event.target.value);
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
      this.setState({ repeatpasswordError });
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

  configureRequestObj = details => {
    const requestObj = {};

    requestObj["name"] = details.username;
    requestObj["gender"] = details.gender;
    requestObj["username"] = "johny45";
    requestObj["password"] = details.password;
    requestObj["email"] = details.email;
    requestObj["phone"] = details.phone;
    requestObj["bits_id"] = details.bits_id;
    requestObj["hostel"] = details.hostel;
    requestObj["room_no"] = +details.room_no;

    if (details.dualDegree) {
      requestObj["is_dual_degree"] = "true";
      requestObj["dual_branch"] = details.dual_branch.split(" ")[0];
    } else {
      requestObj["is_dual_degree"] = "";
      requestObj["single_branch"] = details.single_branch.split(" ")[0];
    }

    return requestObj;
  };

  handleSubmit = event => {
    event.preventDefault();
    // const isValid = this.validate();
    let authData;
    // if (isValid) {
    let isDualDegree = this.state.dualDegree;
    console.log(this.state);
    if (!isDualDegree) {
      authData = {
        name: this.state.fullName,
        gender: this.state.gender,
        username: this.state.username,
        password: this.state.repeatpassword,
        email: this.state.email,
        phone: this.state.phoneNumber,
        bits_id: this.state.bits_id,
        hostel: this.state.hostel,
        room_no: this.state.roomNo,
        is_dual_degree: "",
        single_branch: this.state.branch
      };
    } else {
      authData = {
        name: this.state.fullName,
        gender: this.state.gender,
        username: this.state.username,
        password: this.state.repeatpassword,
        email: this.state.email,
        phone: this.state.phoneNumber,
        bits_id: this.state.bits_id,
        hostel: this.state.hostel,
        room_no: this.state.roomNo,
        is_dual_degree: true,
        dual_branch: this.state.branch
      };
      // }
      // console.log(authData);
    }
    // console.log(this.state);
    if(this.state.isPasswordCorrect || this.state.isPasswordCorrect==="none"){
      axios
        .post("https://market.bits-dvm.org/api/auth/signup/", authData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          alert(response.data.display_message);
        })
        .catch(error => {
          alert(error.response.data.display_message);
        });
     }else{
      alert("password and repeat password do not match");
    }

  };

  yearOfStudy = e => {
    // console.log(e.target.value);
    this.setState({ yearOfStudy: e.target.value }, function() {
      console.log(this.state.yearOfStudy);
      if (this.state.yearOfStudy !== 2019 && this.state.dualDegree) {
        this.setState({
          singleDegree: true,
          dualDegree: true
        });
      } else {
        if (this.state.yearOfStudy === 2019 && this.state.dualDegree) {
          this.setState({
            singleDegree: false,
            dualDegree: true
          });
        }
      }
    });
  };

  showBothBranch = e => {
    if (e.target.value === "Single Degree") {
      this.setState({
        singleDegree: true,
        dualDegree: false
      });
    } else if (e.target.value === "Dual Degree") {
      if (this.state.yearOfStudy === 2019) {
        this.setState({
          singleDegree: false,
          dualDegree: true
        });
      } else {
        this.setState({
          singleDegree: true,
          dualDegree: true
        });
      }
    }
  };

  gender = e => {
    if (e.target.value === "Male") {
      this.setState({
        gender: "M"
      });
    } else {
      this.setState({
        gender: "F"
      });
    }
  };
  
  passwordCheck = e =>{
    if(this.state.password === ""){
      alert("Password is not entered");
    }
    else{
      if(this.state.password === this.state.repeatpassword){
        alert("password matches");
        this.setState({
          isPasswordCorrect : true
        });
      }else{
        alert("password do not match");
        this.setState({
          isPasswordCorrect : false
        });
      }
    }
  }

  render() {
    let enabled;
    if (this.state.gender === "none") {
      enabled = true;
    } else {
      enabled = false;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">
                      Create your account - <b>for 2019 batch only</b>. All
                      other batches are required to login via BITS email
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="username"
                        placeholder="User name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <FormGroup>
                      <div
                        style={{ paddingLeft: "50px" }}
                        onChange={this.gender}
                      >
                        <CustomInput
                          inline
                          type="radio"
                          value="Male"
                          id="exampleCustomRadio"
                          name="customRadio"
                          label="Male"
                        />
                        <CustomInput
                          inline
                          type="radio"
                          value="Female"
                          id="exampleCustomRadio2"
                          name="customRadio"
                          label="Female"
                        />
                      </div>
                    </FormGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="call" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone number"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="mail" />
                        </InputGroupText>
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
                          <ion-icon name="finger-print" size="small" />
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
                          <ion-icon name="done-all" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="repeatpassword"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        onChange={this.handleChange}
                        onBlur = {this.passwordCheck}
                      />
                    </InputGroup>
                    {/*                     
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
                      </CustomInput>
                    </InputGroup> */}

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {this.state.gender === "M" ? (
                        <CustomInput
                          type="select"
                          id="boysHostels"
                          name="hostel"
                          disabled={enabled}
                          onChange={this.handleChange}
                        >
                          <option value="">Select your Hostel.</option>
                          <option value="RM">Ram Bhawan</option>
                          <option value="BUDH">Budh Bhawan</option>
                          <option value="SR-A">Srinivasa Ramanujan A</option>
                          <option value="SR-B">Srinivasa Ramanujan B</option>
                          <option value="SR-C">Srinivasa Ramanujan C</option>
                          <option value="SR-D">Srinivasa Ramanujan D</option>
                          <option value="KR">Krishna Bhawan</option>
                          <option value="GN">Gandhi Bhawan</option>
                          <option value="SK">Shankar Bhawan</option>
                          <option value="VY">Vyas Bhawan</option>
                          <option value="VK">Vishwakarma Bhawan</option>
                          <option value="BG">Bhagirath Bhawan</option>
                          <option value="RP">Rana Pratap Bhawan</option>
                          <option value="AK">Ashok Bhawan</option>
                          <option value="MV-A">Malviya Bhawan A</option>
                          <option value="MV-B">Malviya Bhawan B</option>
                          <option value="MV-C">Malviya Bhawan C</option>
                        </CustomInput>
                      ) : (
                        <CustomInput
                          type="select"
                          id="girlsHostels"
                          name="hostel"
                          disabled={enabled}
                          onChange={this.handleChange}
                        >
                          <option value="">Select your Hostel.</option>
                          <option value="MR-1">Meera Block 1</option>
                          <option value="MR-2">Meera Block 2</option>
                          <option value="MR-3">Meera Block 3</option>
                          <option value="MR-4">Meera Block 4</option>
                          <option value="MR-5">Meera Block 5</option>
                          <option value="MR-6">Meera Block 6</option>
                          <option value="MR-7">Meera Block 7</option>
                          <option value="MR-8">Meera Block 8</option>
                          <option value="MR-9">Meera Block 9</option>
                          <option value="MR-10">Meera Block 10</option>
                        </CustomInput>
                      )}
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="roomNo"
                        id="roomNo"
                        placeholder="Enter Room No"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                        type="select"
                        id="choiceDegree"
                        name="customSelect"
                        onChange={this.showBothBranch}
                      >
                        <option value="">Choose your degree type</option>
                        <option>Single Degree</option>
                        <option>Dual Degree</option>
                      </CustomInput>
                    </InputGroup>
                    {this.state.singleDegree ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="singleDegree"
                          name="branch"
                          onChange={this.handleChange}
                        >
                          <option>Enter your Single Degree Branch.</option>
                          <option value="A1">A1 - B.E. Chemical</option>
                          <option value="A2">A2 - B.E. Civil</option>
                          <option value="A3">
                            A3 - B.E. Electrical and Electronics
                          </option>
                          <option value="A4">A4 - B.E. Mechanical</option>
                          <option value="A5">A5 - B.Pharma</option>
                          <option value="A7">A7 - B.E. Computer Science</option>
                          <option value="A8">
                            A8 - B.E. Electronics and Instrumentation
                          </option>
                          <option value="AB">AB - B.E. Manufacturing</option>
                        </CustomInput>
                      </InputGroup>
                    ) : null}

                    {this.state.dualDegree ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="dualDegree"
                          name="branch"
                          onChange={this.handleChange}
                        >
                          <option>Enter your Dual Branch.</option>
                          <option value="B1">
                            B1 - M.Sc. Biological Sciences
                          </option>
                          <option value="B2">B2 - M.Sc. Chemistry</option>
                          <option value="B3">B3 - M.Sc. Economics</option>
                          <option value="B4">B4 - M.Sc. Mathematics</option>
                          <option value="B5">B5 - M.Sc. Physics</option>
                        </CustomInput>
                      </InputGroup>
                    ) : null}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="pricetag" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="bits_id"
                        placeholder="BITS ID"
                        autoComplete="BitsId"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

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

const mapDispatchToProps = dispatch => {
  return {
    onSignup: signupData => dispatch(actions.signup(signupData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
