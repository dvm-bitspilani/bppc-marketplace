import React, { Component } from "react";
// import { Router, Link } from "@reach/router";
import { connect } from "react-redux";

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

// import * as actions from "../../src/store/actions/index";
const axios = require("axios");

// import { redirectTo } from "@reach/router";

// const initialState = {
//   gender: "",
//   phone: "",
//   bits_id: "",
//   hostel: "",
//   room_no: "",
//   is_dual_degree: "",
//   dual_branch: "",
//   single_branch: "",
//   is_single_branch: "",
//   redirectToDashboard: true
// };

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      phone: "",
      bits_id: "",
      hostel: "",
      room_no: "",
      is_dual_degree: false,
      single_branch: "",
      dual_branch: "",
      is_single_branch: "",
      isuser_fresher: false,
      isgendermale: true,
      yearOfStudy: 2019,
      dualDegree: false,
      singleDegree: true
    };
    this.yearOfStudy = this.yearOfStudy.bind(this);
    this.gender = this.gender.bind(this);
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
    let authData;
    console.log(this.state);
    authData = {
      gender: this.state.gender,
      phone: this.state.phone,
      bits_id: this.state.bits_id,
      hostel: this.state.hostel,
      room_no: this.state.room_no,
      is_dual_degree: this.state.is_dual_degree,
      dual_branch: this.state.dual_branch,
      single_branch: this.state.single_branch
    };

    console.log(authData);

    axios
      .post("https://market.bits-dvm.org/api/DetailsCollection/", authData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  yearOfStudy = e => {
    // console.log(e.target.value);
    this.setState({ yearOfStudy: parseInt(e.target.value) }, function() {
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

  selectedHostel = e => {
    console.log(e.target.value);
    this.setState({
      hostel: e.target.value,
      function() {
        console.log(this.state.hostel);
      }
    });
  };

  showBothBranch = e => {
    if (e.target.value === "Single Degree") {
      this.setState({
        single_branch: true,
        is_dual_degree: ""
      });
    } else if (e.target.value === "Dual Degree") {
      if (this.state.yearOfStudy === 2019) {
        this.setState({
          single_branch: "",
          is_dual_degree: true
        });
      }
    }
  };
  gender = e => {
    const val = e.target.value;
    if (val === "Male") {
      this.setState({
        gender: "M",
        isgendermale: true
      });
      console.log(this.state.gender);
    } else if (val === "Female") {
      this.setState({
        gender: "F",
        isgendermale: false
      });
    }
  };

  finduser = e => {
    const val = e.target.value;
    if (val === "2019") {
      this.setState({ isuser_fresher: true });
    }
  };

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
                    <h1>Tell Us About Yourself</h1>
                    <p className="text-muted">
                      Please fill all mentioned fields
                    </p>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup> */}

                    <FormGroup>
                      <div
                        style={{ paddingLeft: "50px" }}
                        onChange={this.gender}
                      >
                        <CustomInput
                          inline
                          type="radio"
                          name="customRadio"
                          value="Male"
                          id="exampleCustomRadio"
                          label="Male"
                        />
                        <CustomInput
                          inline
                          type="radio"
                          name="customRadio"
                          value="Female"
                          id="exampleCustomRadio2"
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
                        name="phone"
                        id="exampleNumber"
                        placeholder="Phone number"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {/* <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="calendar" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                        type="select"
                        id="exampleCustomSelect"
                        name="year of study"
                        onChange={this.yearOfStudy}
                      >
                        <option value="">Select your year of study</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                      </CustomInput>
                    </InputGroup> */}

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="home" />
                        </InputGroupText>
                      </InputGroupAddon>

                      {this.state.isgendermale === true ? (
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          disabled={enabled}
                          onChange={this.selectedHostel}
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
                          id="exampleCustomSelect"
                          name="customSelect"
                          disabled={enabled}
                          onChange={this.selectedHostel}
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
                        name="room_no"
                        id="exampleNumber"
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
                        id="exampleCustomSelect"
                        name="customSelect"
                        onChange={this.showBothBranch}
                      >
                        <option value="">Choose your degree type</option>
                        <option>Single Degree</option>
                        <option>Dual Degree</option>
                      </CustomInput>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                        type="select"
                        id="exampleCustomSelect"
                        name="customSelect"
                        onChange={this.finduser}
                      >
                        <option value="">Choose your year of Study</option>
                        {/* <option>2019</option> */}
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                      </CustomInput>
                    </InputGroup>
                    {this.state.singleDegree &&
                    this.state.isuser_fresher === false ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="single_branch"
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

                    {this.state.is_dual_degree &&
                    this.state.isuser_fresher === false ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="dual_branch"
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
                    {this.state.isuser_fresher === true ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="dual_branch"
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

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Register);
