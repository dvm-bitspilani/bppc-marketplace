import React, { Component } from "react";

import styles from "../../css-modules/header.module.css";
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
            Logout
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

export default DashboardLinks;
