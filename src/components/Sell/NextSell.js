import React from "react";
// import { Router, Link } from "@reach/router";
import {
  CustomInput,
  Form,
  FormGroup,
  Container,
  Label,
  //   Button,
  //   Row,
  Input
} from "reactstrap";

class NextSell extends React.Component {
  render() {
    return (
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
}

export default NextSell;
