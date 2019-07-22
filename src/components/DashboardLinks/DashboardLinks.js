import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../../css-modules/header.module.css";
import GoogleLogout from "../../components/Logout/GoogleLogout";
import {
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
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
            {this.props.isGoogle ? (
              <GoogleLogout handleGoogleLogout={this.handleGoogleLogout} />
            ) : (
              "Logout"
            )}
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret className={styles.dropdown}>
            Hi, user
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Status</DropdownItem>
            {/* <DropdownItem disabled>Selling</DropdownItem> */}
            <DropdownItem> Notifications</DropdownItem>
            <DropdownItem divider />
            <DropdownItem header>settings</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGoogle: state.auth.email !== "" ? true : false
  };
};

export default connect(mapStateToProps)(DashboardLinks);
