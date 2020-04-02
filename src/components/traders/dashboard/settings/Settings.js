import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";

class Settings extends Component {
    render() {
        return <section>
            <GeneralSettings ref="GeneralSettings" OnSettingsSaved={() => { this.refs.GeneralSettings.componentDidMount(); }} />
            <UsernameAndEmailSettings ref="UsernameAndEmailSettings" OnSettingsSaved={() => { this.refs.UsernameAndEmailSettings.componentDidMount(); }} />
            <PasswordSettings ref="PasswordSettings" OnSettingsSaved={() => { this.refs.PasswordSettings.forceUpdate(); }} />
        </section>;
    }
};

export default Settings;