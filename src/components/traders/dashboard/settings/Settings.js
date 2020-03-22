import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";

class Settings extends Component {
    render() {
        return (
            <div>
                <GeneralSettings ref="GeneralSettings" OnSettingsSaved={() => { this.refs.GeneralSettings.componentDidMount(); }} />
                <UsernameAndEmailSettings ref="UsernameAndEmailSettings" OnSettingsSaved={() => { this.refs.UsernameAndEmailSettings.componentDidMount(); }} />
                <PasswordSettings ref="PasswordSettings" OnSettingsSaved={() => { this.refs.PasswordSettings.forceUpdate(); }} />
            </div> 
        );
    }
};

export default Settings;