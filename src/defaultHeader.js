import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import {Link } from "@reach/router";

import styles from "./header.module.css";
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
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><Link className= {styles.link} to="/">BPPC-Marketplace</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link className= {styles.link} to="/signup">Sign Up</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link className= {styles.link} to="/login">Login</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar> 
      </div>
      );
    }
  }