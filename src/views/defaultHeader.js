import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import { Router, Link } from "@reach/router";



import styles from "./../css-modules/header.module.css";
export default class Example extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
      
      return (
        <div>
        <Navbar color="dark" light expand="md" className={styles.nav}>
          <NavbarBrand href="/" className={styles.logo} >BPPC-Marketplace</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>        
              {this.props.children}
            </Nav>
          </Collapse>
        </Navbar> 
      </div>
      );
    }
  }