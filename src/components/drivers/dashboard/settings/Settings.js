import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            GeneralSettings: <GeneralSettings OnSettingsSaved={this.onGeneralSettingsSaved} />,
            UsernameAndEmailSettings: <UsernameAndEmailSettings OnSettingsSaved={this.onUsernameAndEmailSettingsSaved} />,
            PasswordSettings: <PasswordSettings OnSettingsSaved={this.onPasswordSettingsSaved} />
        };
    }

    onGeneralSettingsSaved = () => {
        this.setState({
            GeneralSettings: null, 
        });
        this.setState({
            GeneralSettings: <GeneralSettings onSettingsSaved={this.onGeneralSettingsSaved} />
        });
    }

    onUsernameAndEmailSettingsSaved = () => {
        this.setState({
            UsernameAndEmailSettings: null
        });
        this.setState({
            UsernameAndEmailSettings: <UsernameAndEmailSettings OnSettingsSaved={this.onUsernameAndEmailSettingsSaved} />
        });
    }

    onPasswordSettingsSaved = () => {
        this.setState({
            PasswordSettings: null
        });
        this.setState({
            PasswordSettings: <PasswordSettings OnSettingsSaved={this.onPasswordSettingsSaved} />
        });
    }

    render() {
        return (
            <div>
                {this.state.GeneralSettings}
                {this.state.UsernameAndEmailSettings}
                {this.state.PasswordSettings}
            </div> 
        );
    }
};

export default Settings;