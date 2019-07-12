import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Dropzone from "react-dropzone";

class ListTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.toggle = this.toggle.bind(this);

    };
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

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
    const listtransfer = (
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
    return <div>{listtransfer}</div>;
  }
}
class FileInput extends React.Component {
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
            <Button color="danger" onClick={this.toggle}>
              {this.props.buttonLabel}
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle} close={closeBtn}>
                Modal title
              </ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Do Something
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
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
  return ["Select Books which you want to sell", "Upload pictures"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ListTransfer />;
    case 1:
      return <FileInput />;
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
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
                <Typography>{getStepContent(index)}</Typography>
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
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}
