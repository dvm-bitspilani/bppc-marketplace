import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import Dropzone from "./dropzone/Dropzone";
import { lightBlue } from "@material-ui/core/colors";
import ListTransfer from "./ListTransfer";

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.uploadChange = this.uploadChange.bind(this);
    this.state = {
      imagesupload: []
    };
  }

  uploadChange(files) {
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      var x = files[i];
      const imagesupload = Object.assign([], this.state.imagesupload);
      imagesupload.push(x);
      this.setState({ imagesupload });
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
class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      currentTag: "",
      pressed: false
    };
    this.input = this.input.bind(this);
    this.add = this.add.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  input = e => {
    this.setState({
      pressed: false,
      currentTag: e.target.value
    });
    if (this.state.pressed) {
      e.target.value = "";
    }
  };
  add = e => {
    let current = this.state.currentTag;
    let alltags = this.state.tags;
    if (current !== "" && alltags.length <= 4) {
      alltags.push(current);
    }
    this.setState({
      tags: alltags,
      currentTag: "",
      pressed: true
    });
  };
  removeTag = value => {
    let tags = this.state.tags;
    tags = tags.filter(function(tag) {
      return tag !== value;
    });
    this.setState({
      tags: tags
    });
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.add();
    }
  };
  render() {
    let tags = this.state.tags;
    let tagContainer = {
      display: "block",
      alignItems: "center",
      boundary: lightBlue,
      marginBottom: "10px",
      width: "100%"
    };
    const button = {
      marginTop: "15px",
      color: "white",
      backgroundColor: "#3f51b5",
      boxShadow:
        "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
    };
    let currentTag = this.state.currentTag;
    return (
      <div>
        <div style={tagContainer}>
          {tags.map((el, index) => {
            return <Tags value={el} key={index} onPress={this.removeTag} />;
          })}
        </div>
        <span>
          <Input
            onChange={this.input}
            type="text"
            name="taginput"
            id="taginput"
            value={currentTag}
            onKeyPress={this.handleKeyPress}
          />
          <Button onClick={this.add} style={button}>
            Add
          </Button>
        </span>
      </div>
    );
  }
}
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    this.props.onPress(this.props.value);
  };

  render() {
    let tagStyle = {
      margin: "5px",
      color: "white",
      backgroundColor: "#28a745",
      padding: "5px",
      height: "35px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      width: "fit-content"
    };
    let icon = {
      marginLeft: "7px"
    };

    return (
      <span style={tagStyle}>
        {this.props.value}
        <ion-icon style={icon} name="close" onClick={this.handleClick} />
      </span>
    );
  }
}

class AdditionalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalDetails: {
        // border: "black solid 10px"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.charactersLimitation = this.charactersLimitation.bind(this);
  }
  handleChange = e => {
    this.props.handleChange(e.target.value, this.props.styles);
  };
  charactersLimitation = e => {
    if (e.target.value.length > 200) {
      this.setState({
        additionalDetails: {
          // boxShadow: "0px 1px 5px 0px red, 0px 2px 2px 0px red, 0px 3px 1px -2px red"
          boxShadow: "0 0 0 0.2rem rgba(255,0,0,0.25)",
          border: "1px solid red"
        }
      });
    } else {
      this.setState({
        additionalDetails: {}
      });
    }
  };
  render() {
    return (
      <div>
        <Input
          type="textarea"
          name="text"
          id="otherDetails"
          onChange={this.charactersLimitation}
          style={this.state.additionalDetails}
        />
      </div>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleText">Description:</Label>
          <Input type="textarea" name="text" id="description" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            Enter the additional material that you have such as slides etc.(Max
            5):
          </Label>
          <TagsContainer />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            Any other details you would like to share with buyer(Max 200
            characters)
          </Label>
          <AdditionalDetails />
        </FormGroup>
      </Form>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    "Select Books which you want to sell",
    "Upload pictures",
    "Description and Tags"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ListTransfer />;
    case 1:
      return <FileInput />;
    case 2:
      return <Description />;
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <Container>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography component={"span"}>
                  {getStepContent(index)}
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              All steps are completed. You can follow up your selling status on
              dashboard and also, you are allowed to edit these details when you
              visit this page again
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </Paper>
        )}
      </div>
    </Container>
  );
}
