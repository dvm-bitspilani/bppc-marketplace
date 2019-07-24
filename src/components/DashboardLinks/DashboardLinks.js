import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../../css-modules/header.module.css";
import GoogleLogout from "../../components/Logout/GoogleLogout";
import {
  NavItem,
  NavLink
  // Dropdown,
  // DropdownItem,
  // DropdownToggle,
  // DropdownMenu
} from "reactstrap";

class DashboardLinks extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleGoogleLogout = response => {
    console.log(response);
    window.alert("Logged out of your account!");
  };

  render() {
    let logout;
    if (localStorage.getItem("token")) {
      logout = localStorage.getItem("isGoogle") === "true" ? (
        <GoogleLogout handleGoogleLogout={this.handleGoogleLogout} />
      ) : (
        "Logout"
      );
    } else {
      logout = "";
    }
    return (
      <div className={styles.linkContainer}>
        <NavItem>
          <NavLink href="/buy" className={styles.link}>
            {" "}
            Buy
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sell" className={styles.link}>
            Sell
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/logout" className={styles.link}>
            {" "}
            {logout}
          </NavLink>
        </NavItem>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGoogle: state.auth.email !== "" ? true : false,
    email: state.auth.email
  };
};

export default connect(mapStateToProps)(DashboardLinks);
