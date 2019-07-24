import React, { Component } from "react";
import { Router } from "@reach/router";
import { connect } from "react-redux";

import HomePage from "./views/HomePage";
import DefaultHeader from "./views/defaultHeader";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Dashboard from "./views/dashboard";
import Buy from "./components/Buy/Buy";
import Sell from "./components/Sell/sell";
import NextSell from "./components/Sell/NextSell";
import DetailsCollectionForm from "./views/detailCollection";
import DashboardLinks from "./components/DashboardLinks/DashboardLinks";
import Logout from "./components/Logout/Logout";
import { NavItem, NavLink, Alert } from "reactstrap";
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

class App extends Component {
  render() {
    console.log(localStorage.getItem("token"));
    return (
      <div className={styles.container}>
        <DefaultHeader>
          <Router>
            <HomepageLinks path="/" />
            <HomepageLinks path="/login" />
            <HomepageLinks path="/signup" />
            <DashboardLinks path="/dashboard" />
            <DashboardLinks path="/buy" />
            <DashboardLinks path="/sell" />
            {/* {localStorage.getItem("token") !== null ? <DashboardLinks path="/buy" /> : null} */}
            {/* {localStorage.getItem("token")!== null ? <DashboardLinks path="/sell" /> : null} */}
          </Router>
        </DefaultHeader>
        <Router>
          <HomePage path="/" />
          <Login path="/login" />
          <SignUp path="/signup" />
          <Dashboard path="/dashboard" />
          {/* {localStorage.getItem("token") !== null ? <Buy path="/buy" /> : null} */}
          {/* {localStorage.getItem("token")!== null ? <Sell path="/sell" /> : null} */}
          <Buy path="/buy" />
          <Sell path="/sell" />
          <Logout path="/logout" />
          <NextSell path="/NextSell" />
          <DetailsCollectionForm path="/detailsCollection" />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(App);
