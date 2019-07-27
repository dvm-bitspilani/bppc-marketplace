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
import ListTransfer from "./ListTransfer";
import FileInput from "./FileInput";
import TagsContainer from "./TagsContainer";
// import { ReactComponent } from "*.svg";
import { navigate } from "@reach/router";
import * as  actions from '../../store/actions/sell';
import {connect} from 'react-redux';
import Description from './Description';
import {AdditionalDetails} from './AdditionalDetails';


class Price extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      price: null
    }
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange = (e) =>{
    this.setState({
      price: e.target.value
    })
  }
  render(){
    return(
    <Form>
        <FormGroup>
          <Label for="exampleText">Price in Rs:</Label>
          <Input onChange={this.handleChange} type="number" name="text" id="description" />
        </FormGroup>
     </Form>
    )
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
    "Description and Tags",
    "Price"
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
    case 3:
      return <Price/>
    default:
      return "Unknown step";
  }
}

 function VerticalLinearStepper(){
   
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function handleNext() {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
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
                <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Go to last step
                </Button>
            </Paper>
          )}
        </div>
      </Container>
    );  
   
}

class Sell extends React.Component{
  constructor(props){
    super(props);
  }

  // componentDidMount() {
  //   if (localStorage.getItem("token") === null) {
  //     window.alert("Unauthenticated user. Please login first!");
  //     setTimeout(() => navigate("/login"), 100);
  //   }
  //   console.log(this.state.count)
  //   console.log(this.props.getData(localStorage.getItem("token")));    
  // }
  // componentWillMount(){
  //   this.props.getData(localStorage.getItem("token"));
  // }

  render(){
    let sell;
    if(localStorage.getItem("token")){
     sell = (<VerticalLinearStepper/>)
    }else
    {
      sell = <div>{" "}</div>;
    }
    return sell;
  }
}

export default Sell;