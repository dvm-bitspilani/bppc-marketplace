import React, { Component } from 'react';
import { navigate } from '@reach/router'

export class dashboard extends Component {
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.alert("Unauthenticated user. Please login first!");
      setTimeout(() => navigate("/login"), 100);
    }
   }

  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

export default dashboard
