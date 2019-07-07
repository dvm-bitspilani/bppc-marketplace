import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import HomePage from "./views/HomePage";
import DefaultHeader from "./defaultHeader";
import Login from "./views/Login";
import SignUp from "./views/Signup";
function App() {
  return (
    <div className="bg-light" style={{height:"100vh"}}>
      <DefaultHeader >
      </DefaultHeader>
      <Router>
        <HomePage  path="/"/>
        <Login path="/login"/>
        <SignUp path="/signup"/>
      </Router>

    </div>
  );
}

export default App;
