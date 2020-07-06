import React, { Component } from "react";
import AddDrivingLicenceDialog from "./AddDrivingLicenceDialog.js";

class AddDrivingLicenceButton extends Component {
    constructor() {
        super();

        this.state = {
            AddDrivingLicenceDialog: null,
        };
    }

    render() {
        return (
            <section>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ minWidth: "152px" }}
                    data-toggle="modal"
                    data-target="#add-driving-licence-dialog"
                    onMouseDown={() => {
                        this.setState({
                            AddDrivingLicenceDialog: (<AddDrivingLicenceDialog
                                OnCancel={() => {
                                    this.setState({
                                        AddDrivingLicenceDialog: null,
                                    });
                                }}
                                OnOK={cancelButton => {
                                    cancelButton.click();
                                    this.props.OnDocumentsUpdated();
                                }} />),
                        });
                    }}>{Dictionary.AddDrivingLicence}</button>
                {this.state.AddDrivingLicenceDialog}
            </section>
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddDrivingLicence: "إضافة رخصة قيادة"
    };
}
else {
    Dictionary = {
        AddDrivingLicence: "Add Driving Licence"
    };
}

export default AddDrivingLicenceButton;