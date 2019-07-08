import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import HomePage from "./views/HomePage";
import DefaultHeader from "./views/defaultHeader";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Dashboard from "./views/dashboard";
import Buy from "./views/buy";
import Sell from "./views/sell";
import NextSell from "./views/NextSell";

import {
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import styles from "./css-modules/header.module.css";

function HomepageLinks() {
  return (
    <div className={styles.linkContainer}>
      <NavItem>
        <NavLink href="/signup" className={styles.link}>
          {" "}
          Sign Up
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/login" className={styles.link}>
          Login
        </NavLink>
      </NavItem>
    </div>
  );
}
class DashboardLinks extends React.Component {
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

function App() {
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <DefaultHeader>
        <Router>
          <HomepageLinks path="/" />
          <HomepageLinks path="/login" />
          <HomepageLinks path="/signup" />
          <DashboardLinks path="/dashboard" />
          <DashboardLinks path="/buy" />
          <DashboardLinks path="/sell" />
        </Router>
      </DefaultHeader>
      <Router>
        <HomePage path="/" />
        <Login path="/login" />
        <SignUp path="/signup" />
        <Dashboard path="/dashboard" />
        <Buy path="/buy" />
        <Sell path="/sell" />
        <NextSell path="/NextSell" />
      </Router>
    </div>
  );
}

export default App;
