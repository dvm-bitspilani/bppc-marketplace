import React from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import * as  actions from '../../store/actions/sell';
import {connect} from 'react-redux';

class Price extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        price: this.props.price
      }
      this.handleChange=this.handleChange.bind(this);
    }
    componentWillMount(){
        // console.log(this.props.price)
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