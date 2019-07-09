import React from "react";
import { Router, Link } from "@reach/router";

import {
  CustomInput,
  Form,
  FormGroup,
  Container,
  Label,
  Button,
  Row,
  Input
} from "reactstrap";

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
      showdual: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.setState(
      (state, props) => {
        return { currentTab: state.currentTab + 1 };
      },
      function() {
        console.log(this.state.currentTab);
        if (this.state.currentTab == 4) {
          this.setState(() => {
            return { currentTab: 3 };
          });
        }
        if (this.state.currentTab == 0) {
          this.setState(() => {
            return { currentTab: 2 };
          });
        }
      }
    );
  }
  previous() {
    this.setState(
      (state, props) => {
        return { currentTab: state.currentTab - 1 };
      },
      function() {
        console.log(this.state.currentTab);
        if (this.state.currentTab == 4) {
          this.setState(() => {
            return { currentTab: 2 };
          });
        }
        if (this.state.currentTab == 0) {
          this.setState(() => {
            return { currentTab: 1 };
          });
        }
      }
    );
  }

  showdual = e => {
    if (e.target.checked) {
      this.setState({
        showdual: true
      });
    } else {
      this.setState({
        showdual: false
      });
    }
  };

  render() {
    let tab;
    if (this.state.currentTab === 1) {
      tab = (
        <div>
          <Form>
            <FormGroup>
              <Label for="exampleCustomSelect">Hostel</Label>
              <CustomInput
                type="select"
                id="exampleCustomSelect"
                name="customSelect"
              >
                <option value="">Enter your Hostel.</option>
                <option>SR</option>
                <option>SR</option>
                <option>SR</option>
                <option>SR</option>
                <option>SR</option>
              </CustomInput>
            </FormGroup>

            <FormGroup>
              <Label for="exampleCustomSelect">Enter your Branch</Label>
              <CustomInput
                type="select"
                id="exampleCustomSelect"
                name="customSelect"
              >
                <option value="">Enter your Branch.</option>
                <option>A1</option>
                <option>A2</option>
                <option>A3</option>
                <option>A4</option>
                <option>A5</option>
                <option>A7</option>
                <option>A8</option>
                <option>AB</option>
              </CustomInput>
            </FormGroup>
            <br />

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="dualdegree"
                  onChange={this.showdual}
                />{" "}
                Are you a dual degree student?
              </Label>
            </FormGroup>
            <br />
            {this.state.showdual ? (
              <FormGroup>
                <Label for="exampleCustomSelect">Enter your Branch</Label>
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                >
                  <option value="">Enter your Dual Branch.</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>B3</option>
                  <option>B4</option>
                  <option>B5</option>
                </CustomInput>
              </FormGroup>
            ) : null}
            <Row className="justify-content-center">
              <Link to="/NextSell" />
            </Row>

            <br />
          </Form>
        </div>
      );
    } else if (this.state.currentTab == 2) {
      tab = <div>List Transfer will appear here</div>;
    } else {
      tab = (
        <div>
          <Container>
            <Form>
              <Label>
                <Label for="exampleCustomFileBrowser">Upload an Image</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  label="pick a file"
                />
              </Label>
              <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
            </Form>
          </Container>
        </div>
      );
    }

    return (
      <div class="stepper">
        <div>
          <span class="step" />
          <span class="step" />
          <span class="step" />
          <span class="step" />
        </div>
        <div>{tab}</div>
        <div>
          <Button color="secondary" onClick={this.previous}>
            Previous
          </Button>{" "}
          <Button color="success" onClick={this.next}>
            Next
          </Button>{" "}
        </div>
      </div>
    );
  }
}

class Sell extends React.Component {
  state = {
    showdual: false
  };

  showdual = e => {
    if (e.target.checked) {
      this.setState({
        showdual: true
      });
    } else {
      this.setState({
        showdual: false
      });
    }
  };
  render() {
    return (
      <div>
        <Container>
          <Stepper />
        </Container>
      </div>
    );
  }
}

export default Sell;
