import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";

class Settings extends Component {
    render() {
        return (
            <div>
                <GeneralSettings />
                <UsernameAndEmailSettings />
                <PasswordSettings />
            </div> 
        );
    }
};

export default Settings;