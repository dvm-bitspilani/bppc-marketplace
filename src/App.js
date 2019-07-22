import React, { Component } from "react";
import { Router } from "@reach/router";

import HomePage from "./views/HomePage";
import DefaultHeader from "./views/defaultHeader";
import Login from "./components/Login/Login";
import SignUp from "./views/Signup";
import Dashboard from "./views/dashboard";
import Buy from "./components/Buy/Buy";
import Sell from "./views/sell";
import NextSell from "./views/NextSell";
import DetailsCollectionForm from "./views/detailCollection";
import DashboardLinks from "./components/DashboardLinks/DashboardLinks";
import Logout from "./components/Logout/Logout";
import { NavItem, NavLink } from "reactstrap";
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
          </Router>
        </DefaultHeader>
        <Router>
          <HomePage path="/" />
          <Login path="/login" />
          <SignUp path="/signup" />
          <Dashboard path="/dashboard" />
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

export default App;
