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
  Input
} from "reactstrap";

class ListTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      books: [
        {
          id: 1,
          category: "Thermodynamics",
          title: "Book 1"
        },
        {
          id: 2,
          category: "Thermodynamics",
          title: "Book 2"
        },
        {
          id: 6,
          category: "MeOW",
          title: "Book 1"
        },
        {
          id: 1,
          category: "MeOW",
          title: "Book 2"
        },
        {
          id: 8,
          category: "Biology",
          title: "Book 1"
        },
        {
          id: 2,
          category: "Biology",
          title: "Book 2"
        }
      ],
      selectedItems: [],
      selectedbooks: []
    };
  }
  handleClick = i => {
    const books = Object.assign([], this.state.books);
    const selectedbooks = Object.assign([], this.state.selectedbooks);
    selectedbooks.push(books[i]);
    delete books[i];
    this.setState({ booksoption: books, selectedbooks: selectedbooks });
    console.log(this.state.selectedbooks);
  };

  removehandleClick = i => {
    const booksoption = Object.assign([], this.state.booksoption);
    const selectedbooks = Object.assign([], this.state.selectedbooks);
    booksoption.push(selectedbooks[i]);
    delete selectedbooks[i];
    this.setState({ booksoption: booksoption, selectedbooks: selectedbooks });
  };

  handleChange(selectedItems) {
    this.setState({ selectedItems });
  }
  render() {
    const items = this.state.books;

    const divStyle = {
      width: "45%",
      height: "50vh",
      border: "1px solid grey",
      margin: "auto",
      borderRadius: "5px",
      overflowX: "hidden"
    };
    const groupstyle = {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly"
    };
    const headingstyle = {
      width: "100%",
      padding: "5px",
      color: "grey",
      backgroundColor: "lightgrey"
    };

    const spanstyle = {
      width: "100%",
      padding: "5px"
    };

    const containerstyle = {
      display: "flex",
      justifyContent: "center"
    };

    const cats = items.reduce((catsSoFar, { category, title }) => {
      if (!catsSoFar[category]) catsSoFar[category] = [];
      catsSoFar[category].push(title);
      return catsSoFar;
    }, {});

    console.log(cats);

    const show = Object.keys(cats).map(key => {
      return (
        <div key={key} style={groupstyle}>
          <span style={headingstyle}>{key}</span>
          {cats[key].map(dataItem => {
            return (
              <span
                key={dataItem.id}
                style={spanstyle}
                onClick={this.handleClick}
              >
                {dataItem}
              </span>
            );
          })}
        </div>
      );
    });

    // const booklist = this.state.booksoption.map((item, i) => (
    //   <option key={i} onClick={() => this.handleClick(i)}>
    //     {item}
    //   </option>
    // ));

    // const newlist = this.state.selectedbooks.map((item, i) => (
    //   <option key={i} onClick={() => this.removehandleClick(i)}>
    //     {item}
    //   </option>
    // ));
    const listtransfer = (
      <div style={containerstyle}>
        {/* <FormGroup>
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
        </FormGroup> */}
        <div className="bookslist" style={divStyle}>
          <div style={groupstyle}>{show}</div>
        </div>
        <div className="bookslist" style={divStyle} />
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
