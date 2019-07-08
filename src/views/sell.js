import React from "react";
import {
  CustomInput,
  Form,
  FormGroup,
  Container,
  Label,
  Input
} from "reactstrap";

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
}

export default Sell;
