import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import TBGeneralSettings from "./TBGeneralSettings";
import TBUsernameAndEmailSettings from "./TBUsernameAndEmailSettings";
import TBPasswordSettings from "./TBPasswordSettings";

class TBSettings extends Component {
    render() {
        return (
            <div>
                <TBGeneralSettings />
                <TBUsernameAndEmailSettings />
                <TBPasswordSettings />
            </div>
        );
    }
};

export default TBSettings;