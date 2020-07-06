import React, { Component } from "react";
import GeneralSettings from "./GeneralSettings";
import UsernameAndEmailSettings from "./UsernameAndEmailSettings";
import PasswordSettings from "./PasswordSettings";
import NaqelSettings from "./NaqellSettings";

class Settings extends Component {
    render() {
        return <section>
            <GeneralSettings OnSettingsSaved={() => {
                this.SettingsSavedButton.click();
                this.props.OnSettingsSaved();
            }} />
            <UsernameAndEmailSettings OnSettingsSaved={() => {
                this.SettingsSavedButton.click();
                this.props.OnSettingsSaved();
            }} />
            <PasswordSettings OnSettingsSaved={() => {
                this.SettingsSavedButton.click();
                this.props.OnSettingsSaved();
            }} />
            <NaqelSettings />

            <button
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#settings-saved-dialog"
                ref={settingsSavedButton => this.SettingsSavedButton = settingsSavedButton}></button>

            <div className="modal modal-center-vertical" id="settings-saved-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-sh3 m-b-xxs">Settings saved successfully.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default Settings;