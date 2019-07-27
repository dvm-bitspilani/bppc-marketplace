import React from 'react';
import {Form, FormGroup, Label, Input } from "reactstrap";
import AdditionalDetails from "./AdditionalDetails";
import TagsContainer from "./TagsContainer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Description extends React.Component {

    constructor(props){
      super(props);
      this.state={
        description:"",
        tags: [],
        additionalDetails: ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleTags = this.handleTags.bind(this);
      this.removeTag = this.removeTag.bind(this);
      this.handleAddDetails = this.handleAddDetails.bind(this);
    }
  
    handleChange = (e) =>{
      this.setState({
        description: e.target.value
      })
    }
  
    handleTags = (e,tags) =>{
      console.log("ea");
      console.log(tags);
      if(tags != undefined){
        this.setState({
          tags:tags
        })
      }
    }
    componentWillUnmount =() =>{
        this.props.description(this.state.tags,this.state.description,this.state.additionalDetails);
    }
    removeTag = value => {
      let tags = this.state.tags;
      tags = tags.filter(function(tag) {
        return tag !== value;
      });
      this.setState({
        tags: tags
      });
    };
  
    handleAddDetails = e =>{
      this.setState({
        additionalDetails: e.target.value
      })
    }
    render() {
      return (
        <Form>
          <FormGroup>
            <Label for="exampleText">Description:</Label>
            <Input onChange={this.handleChange} type="textarea" name="text" id="description" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">
              Enter the additional material that you have such as slides etc.(Max
              5):
            </Label>
            <TagsContainer add={this.handleTags} remove={this.removeTag}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">
              Any other details you would like to share with buyer(Max 200
              characters)
            </Label>
            <AdditionalDetails handleAddDetails={this.handleAddDetails}/>
          </FormGroup>
        </Form>
      );
    }
  }

  const mapStateToProps = state => {
    return {
        tags: state.sell.tags,
        details:state.sell.details,
        description:state.sell.description
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      description :(tags,details,description) => dispatch(actions.updateDescription(tags,details,description))
    };
  };
  
  export default connect(
   mapStateToProps,mapDispatchToProps
  )(Description);
