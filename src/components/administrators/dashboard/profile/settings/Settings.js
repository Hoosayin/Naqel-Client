import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";

class Settings extends Component {
    render() {
        return <section>
            <GeneralSettings OnSettingsSaved={this.props.OnSettingsSaved} />
            <UsernameAndEmailSettings OnSettingsSaved={this.props.OnSettingsSaved} />
            <PasswordSettings OnSettingsSaved={this.props.OnSettingsSaved} />
        </section>;
    }
};

export default Settings;