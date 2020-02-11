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
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#add-driving-licence-dialog"
                    onMouseDown={() => {
                        this.setState({
                            AddDrivingLicenceDialog: (<AddDrivingLicenceDialog
                                OnAddDrivingLicenceDialogRemove={() => {
                                    this.setState({
                                        AddDrivingLicenceDialog: null,
                                    });
                                }}
                                OnDrivingLicenceAdded={cancelButton => {
                                    cancelButton.click();
                                    this.props.OnDocumentsUpdated();
                                }} />),
                        });
                    }}>
                    Add Driving Licence
                </button>
                {this.state.AddDrivingLicenceDialog}
            </section>
        );
    }
};

export default AddDrivingLicenceButton;