import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import HomePage from "./views/HomePage";
import DefaultHeader from "./defaultHeader";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Dashboard from "./views/dashboard";
import Buy from "./views/buy";
import Sell from "./views/sell";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import styles from "./header.module.css";

function HomepageLinks(){ 
  return (
    <div style={{display:"flex"}}>
    <NavItem>
    <NavLink href="/signup" className={styles.link}> Sign Up</NavLink>
    </NavItem>
    <NavItem>
    <NavLink href="/login" className={styles.link}>Login</NavLink>
    </NavItem>
    </div>
  );
}
function DashboardLinks(){ 
return (
<div style={{display:"flex"}}>
  <NavItem>
  <NavLink href="/buy" className={styles.link}> Buy</NavLink>
  </NavItem>
  <NavItem>
  <NavLink href="/sell" className={styles.link}>Sell</NavLink>
  </NavItem>
</div>
  );  
}

function App() {
  return (
    <div className="bg-light" style={{height:"100vh"}}>
      <DefaultHeader>
        <Router>
          <HomepageLinks path="/"/>
          <HomepageLinks path="/login"/>
          <HomepageLinks path="/signup"/>
          <DashboardLinks path="/dashboard"/>
          <DashboardLinks path="/buy"/>
          <DashboardLinks path="/sell"/>
        </Router>
      </DefaultHeader>
      <Router>
          <HomePage  path="/"/>
          <Login path="/login"/>
          <SignUp path="/signup"/>
          <Dashboard path="/dashboard"/>
          <Buy path="/buy"/>
          <Sell path="/sell"/>
      </Router>
    </div>
  );
}

export default App;
