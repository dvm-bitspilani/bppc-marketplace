import React from "react";
import Dropzone from "./dropzone/Dropzone";
import { Container, Form } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const axios = require('axios');

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.uploadChange = this.uploadChange.bind(this);
    this.state = {
      imagesupload: this.props.imagesupload
    };
  }
  
  componentDidMount() {
    axios
    .get("http://market.bits-dvm.org/api/sell/",{
      headers: {
        "Content-Type": "application/json",
        "Authorization" :"bearer "+ localStorage.getItem("token"),
      }
    })
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  uploadChange(files) {
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      var x = files[i];
      const imagesupload = Object.assign([], this.state.imagesupload);
      imagesupload.push(x);
      this.setState({ imagesupload });
      this.props.onImagetransfer(this.state.imagesupload);
    }
  }
  render() {
    return (
      <div>
        <Container>
          <Form>
            {/* <Label>
                <Label for="exampleCustomFileBrowser">Upload an Image</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  label="pick a file"
                />
              </Label> */}
            <div className="App">
              <div className="Card">
                <Dropzone
                  onFilesAdded={this.uploadChange}
                  imagearr={this.state.imagesupload}
                />
              </div>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    imagesupload: state.sell.imagesupload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImagetransfer: inputfile => dispatch(actions.updateimagestate(inputfile))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileInput);
