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
import Price from "./Price";

class FinishButton extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        
      }
      this.handleClick = this.handleClick.bind(this);
    }  
    handleClick = () => {
      this.props.onClick();
      this.props.sellEnd(localStorage.getItem("token"));
    }

    render(){
      return(
        <Button
        variant={this.props.variant}
        color={this.props.color}
        onClick={this.handleClick}
        className={this.props.className}
        >
          Finish
        </Button> 
      )
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
    sellEnd: (token) => dispatch(actions.sellEnd(token))
    };
  };

  export default connect(
    null, mapDispatchToProps
  )(FinishButton);