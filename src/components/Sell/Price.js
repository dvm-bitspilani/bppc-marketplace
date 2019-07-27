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
        price: this.props.price
      }
      this.handleChange=this.handleChange.bind(this);
    }
    componentWillMount(){
        console.log(this.props.price)
        this.setState({
            price: this.props.price
        })
    }
    componentWillUnmount(){
        this.props.priceUpdate(this.state.price);
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
            <Input onChange={this.handleChange} value={this.state.price} type="number" name="text" id="description" />
          </FormGroup>
       </Form>
      )
    }
}

const mapStateToProps = state => {
    return {
      price: state.sell.price
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
     priceUpdate: (price) => dispatch(actions.priceUpdate(price))
    };
  };
  
  export default connect(
   mapStateToProps,mapDispatchToProps
  )(Price);