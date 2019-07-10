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
      booksoption: [
        "thermo",
        "meow",
        "cp",
        "genchem",
        "bio",
        "m1",
        "m2",
        "elecsci"
      ],
      selectedbooks: [],

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
        if (this.state.currentTab === 4) {
          this.setState(() => {
            return { currentTab: 1 };
          });
        }
        if (this.state.currentTab === 0) {
          this.setState(() => {
            return { currentTab: 1 };
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
            return { currentTab: 1 };
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

  handleClick = i => {
    const booksoption = Object.assign([], this.state.booksoption);
    const selectedbooks = Object.assign([], this.state.selectedbooks);
    selectedbooks.push(booksoption[i]);
    delete booksoption[i];
    this.setState({ booksoption: booksoption, selectedbooks: selectedbooks });
  };

  removehandleClick = i => {
    const booksoption = Object.assign([], this.state.booksoption);
    const selectedbooks = Object.assign([], this.state.selectedbooks);
    booksoption.push(selectedbooks[i]);
    delete selectedbooks[i];
    this.setState({ booksoption: booksoption, selectedbooks: selectedbooks });
  };

  render() {
    const booklist = this.state.booksoption.map((item, i) => (
      <option key={i} onClick={() => this.handleClick(i)}>
        {item}
      </option>
    ));

    const newlist = this.state.selectedbooks.map((item, i) => (
      <option key={i} onClick={() => this.removehandleClick(i)}>
        {item}
      </option>
    ));

    let tab;
    if (this.state.currentTab === 1) {
      tab = (
        <div>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Books</Label>
            <Input
              type="select"
              name="selectMulti"
              id="exampleSelectMulti"
              multiple
            >
              {booklist}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Books you selected</Label>
            <Input
              type="select"
              name="selectMulti"
              id="exampleSelectMulti"
              multiple
            >
              {newlist}
            </Input>
          </FormGroup>
        </div>
      );
      // } else if (this.state.currentTab === 2) {
      //   tab = (
      //     <div>
      //       <FormGroup>
      //         <Label for="exampleSelectMulti">Select Books</Label>
      //         <Input
      //           type="select"
      //           name="selectMulti"
      //           id="exampleSelectMulti"
      //           multiple
      //         >
      //           {booklist}
      //         </Input>
      //       </FormGroup>
      //       <FormGroup>
      //         <Label for="exampleSelectMulti">Books you selected</Label>
      //         <Input
      //           type="select"
      //           name="selectMulti"
      //           id="exampleSelectMulti"
      //           multiple
      //         >
      //           {newlist}
      //         </Input>
      //       </FormGroup>
      //     </div>
      //   );
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
