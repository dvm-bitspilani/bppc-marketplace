import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container, Alert } from "reactstrap";
import ListTransfer from "./ListTransfer";
import FileInput from "./FileInput";
import FinishButton from "./FinishButton";
// import TagsContainer from "./TagsContainer";
// import { ReactComponent } from "*.svg";
// import { navigate } from "@reach/router";
// import * as  actions from '../../store/actions/sell';
// import {connect} from 'react-redux';
import Description from "./Description";
// import {AdditionalDetails} from './AdditionalDetails';
import Price from "./Price";
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
      return <Price />;
    default:
      return "Unknown step";
  }
}

function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  // function twoCalls() {
  //   handleNext();
  //   // console.log(prototype)
  //   // props.sellEnd(localStorage.getItem("token"));
  // }
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

                    {activeStep === steps.length - 1 ? (
                      <FinishButton
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      />
                    ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          Next
                      </Button>
                      )}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Alert color="success" >
              Great! You have completed all the steps, Please wait for a few seconds for image uploads. You will see a popup after your details are sent to server.
            </Alert>
            <Alert color="success" >
              You can edit details
              by going back to those steps and you will get your details which you have filled, just edit them and click on
              finish. Also you will be allowed to edit your details in same when you come back or reload this page.
            </Alert>
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

// class VerticalLinearStepper extends React.Component{

//   constructor(props){
//     super(props);
//     this.state = {
//       activeStep:0
//     }
//     this.handleBack = this.handleBack.bind(this);
//     this.handleNext = this.handleNext.bind(this);
//     this.twoCalls = this.twoCalls.bind(this);
//   }
//   handleNext = (e) => {
//     let activeStep = this.state.activeStep;
//     let steps = getSteps();
//     if((steps.length-1) == (activeStep)){
//       activeStep = 0;
//     }
//     else{
//       activeStep = activeStep +1;
//     }
//     this.setState({
//       activeStep: activeStep
//     });
//   }

//   handleBack = (e) => {
//     // const [activeStep, setActiveStep] = React.useState(0);
//     // setActiveStep(prevActiveStep => prevActiveStep - 1);

//     let activeStep = this.state.activeStep;
//     let steps = getSteps();
//     if(activeStep == 0){
//       activeStep = steps.length -1;
//     }
//     else{
//       activeStep = activeStep -1;
//     }
//     this.setState({
//       activeStep: activeStep
//     });

//   }
//   twoCalls= (e) => {
//     this.handleNext(e);
//     this.props.sellEnd(localStorage.getItem("token"));
//   }
//   render() {
//     const classes = useStyles();
//     const steps = getSteps();
//     let activeStep = this.state.activeStep;
//     return(
//     <Container>
//       <div className={classes.root}>
//         <Stepper activeStep={activeStep} orientation="vertical">
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//               <StepContent>
//                 <Typography component={"span"}>
//                   {getStepContent(index)}
//                 </Typography>
//                 <div className={classes.actionsContainer}>
//                   <div>
//                     <Button
//                       disabled={activeStep === 0}
//                       onClick={(e) => this.handleBack(e)}
//                       className={classes.button}
//                     >
//                       Back
//                     </Button>

//                       {(activeStep === steps.length - 1)?(

//                       <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={(e) => this.twoCalls(e)}
//                       className={classes.button}
//                       >
//                         Finish
//                       </Button>

//                       ):(

//                       <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={(e) => this.handleNext(e)}
//                       className={classes.button}
//                       >
//                         Next
//                       </Button>
//                       )

//                       }

//                   </div>
//                 </div>
//               </StepContent>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === steps.length && (
//           <Paper square elevation={0} className={classes.resetContainer}>
//             <Typography>
//               All steps are completed. You can follow up your selling status on
//               dashboard and also, you are allowed to edit these details when you
//               visit this page again
//             </Typography>
//             {/* <Button onClick={handleReset} className={classes.button}>
//               Reset
//             </Button> */}
//               <Button
//                       disabled={activeStep === 0}
//                       onClick={(e) => this.handleBack(e)}
//                       className={classes.button}
//                     >
//                       Go to last step
//               </Button>
//           </Paper>
//         )}
//       </div>
//     </Container>
//     )
//   };
//   }

class Sell extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

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

  render() {
    let sell;
    if (localStorage.getItem("token")) {
      sell = <VerticalLinearStepper />;
    } else {
      sell = <div> </div>;
    }
    return sell;
  }
}

export default Sell;
