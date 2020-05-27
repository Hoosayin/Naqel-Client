import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";
import NaqelSettings from "./NaqellSettings";

class Settings extends Component {
    render() {
        return <section>
            <GeneralSettings OnSettingsSaved={this.props.OnSettingsSaved} />
            <UsernameAndEmailSettings OnSettingsSaved={this.props.OnSettingsSaved} />
            <PasswordSettings OnSettingsSaved={this.props.OnSettingsSaved} />
            <NaqelSettings />
        </section>;
    }
};

export default Settings;