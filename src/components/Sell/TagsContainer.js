import React from "react";
import Button from "@material-ui/core/Button";
import { Input } from "reactstrap";
import { lightBlue } from "@material-ui/core/colors";
import Tags from "./Tags";


class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      currentTag: "",
      pressed: false
    };
    this.input = this.input.bind(this);
    this.add = this.add.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    this.setState({
      tags: this.props.tags
    });
  }
  input = e => {
    this.setState({
      pressed: false,
      currentTag: e.target.value
    });
    if (this.state.pressed) {
      e.target.value = "";
    }
  };
  add = e => {
    let current = this.state.currentTag;
    let alltags = this.state.tags;
    if (current !== "" && alltags.length <= 4) {
      alltags.push(current);
    }
    this.setState({
      tags: alltags,
      currentTag: "",
      pressed: true
    });
    // console.log(this.state.tags);
  };
  removeTag = value => {
    let tags = this.state.tags;
    tags = tags.filter(function(tag) {
      return tag !== value;
    });
    this.setState({
      tags: tags
    });
    this.props.remove(value);
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.add();
    }
  };

  handleChange = (e,tags = this.state.tags) =>{
    this.props.add(e,tags);
  }
  render() {
    let tags = this.state.tags;
    let tagContainer = {
      display: "block",
      alignItems: "center",
      boundary: lightBlue,
      marginBottom: "10px",
      width: "100%"
    };
    const button = {
      marginTop: "15px",
      color: "white",
      backgroundColor: "#3f51b5",
      boxShadow:
        "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
    };
    let currentTag = this.state.currentTag;
    return (
      <div onChange={this.handleChange}>
        <div style={tagContainer}>
          {tags.map((el, index) => {
            return <Tags value={el} key={index} onPress={this.removeTag} />;
          })}
        </div>
        <span>
          <Input
            onChange={this.input}
            type="text"
            name="taginput"
            id="taginput"
            value={currentTag}
            onKeyPress={this.handleKeyPress}
          />
          <Button onClick={this.add} style={button}>
            Add
          </Button>
        </span>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     tags: state.sell.tags
//   };
// };

// export default connect(mapStateToProps)(TagsContainer);
export default TagsContainer;
