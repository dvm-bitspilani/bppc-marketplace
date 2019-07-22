import React from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
    navigate("/login");
  }

  render() {
    return <div>{" "}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
