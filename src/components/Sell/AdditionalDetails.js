import React from 'react';
import { Input } from "reactstrap";


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
      this.twoCalls = this.twoCalls.bind(this);
    }

    handleChange = (e) => {
      this.props.handleAddDetails(e);
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
    twoCalls(e){
        this.charactersLimitation(e);
        this.handleChange(e);
    }
    render() {
      return (
  
          <Input
            type="textarea"
            name="text"
            id="otherDetails"
            onChange={this.twoCalls}
            style={this.state.additionalDetails}
            // onChange={this.handleChange}
          />
      );
    }
  }

  export default AdditionalDetails;