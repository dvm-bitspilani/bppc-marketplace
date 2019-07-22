import React from "react";
import { GoogleLogout } from "react-google-login";

const googleLogout = props => {
  return (
    <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={props.handleGoogleLogout}
    />
  );
};

export default googleLogout;
