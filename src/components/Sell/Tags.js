import React from "react";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    this.props.onPress(this.props.value);
  };

  render() {
    let tagStyle = {
      margin: "5px",
      color: "white",
      backgroundColor: "#28a745",
      padding: "5px",
      height: "35px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      width: "fit-content"
    };
    let icon = {
      marginLeft: "7px"
    };

    return (
      <span style={tagStyle}>
        {this.props.value}
        <ion-icon style={icon} name="close" onClick={this.handleClick} />
      </span>
    );
  }
}

export default Tags;
