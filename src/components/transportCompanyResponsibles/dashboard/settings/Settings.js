import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";
import PageHeading from "../../../../controls/PageHeading";

class Settings extends Component {
    render() {
        return <section>
            <PageHeading Heading="SETTINGS" />
            <GeneralSettings />
            <UsernameAndEmailSettings />
            <PasswordSettings />
        </section>;
    }
};

export default Settings;