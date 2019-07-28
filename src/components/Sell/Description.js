import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import AdditionalDetails from "./AdditionalDetails";
import TagsContainer from "./TagsContainer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      tags: this.props.tags,
      additionalDetails: this.props.details
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleAddDetails = this.handleAddDetails.bind(this);
  }

  handleChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleTags = (e, tags) => {
    if (tags !== undefined) {
      this.setState({
        tags: tags
      });
    }
  };
  componentWillMount = () => {
    // console.log(this.props.details,"details =",this.props.tags," description =" ,this.props.description)
    this.setState({
      description: this.props.description,
      tags: this.props.tags,
      additionalDetails: this.props.details
    });
  };
  componentWillUnmount = () => {
    this.props.descriptions(
      this.state.tags,
      this.state.additionalDetails,
      this.state.description
    );
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

  handleAddDetails = e => {
    this.setState({
      additionalDetails: e.target.value
    });
  };
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleText">Description:</Label>
          <Input
            onChange={this.handleChange}
            value={this.state.description}
            type="textarea"
            name="text"
            id="description"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            Enter the additional material that you have such as slides etc.(Max
            5):
          </Label>
          <TagsContainer
            add={this.handleTags}
            remove={this.removeTag}
            tags={this.state.tags}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            Any other details you would like to share with buyer(Max 200
            characters)
          </Label>
          <AdditionalDetails
            handleAddDetails={this.handleAddDetails}
            value={this.state.additionalDetails}
          />
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.sell.tags,
    details: state.sell.details,
    description: state.sell.description
  };
};

const mapDispatchToProps = dispatch => {
  return {
    descriptions: (tags, details, description) =>
      dispatch(actions.updateDescription(tags, details, description))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
