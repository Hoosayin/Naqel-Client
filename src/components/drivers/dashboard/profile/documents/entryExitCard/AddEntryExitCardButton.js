import React, { Component } from "react";
import AddEntryExitCardDialog from "./AddEntryExitCardDialog.js";

class AddEntryExitCardButton extends Component {
    constructor() {
        super();

        this.state = {
            AddEntryExitCardDialog: null,
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
                    data-target="#add-entry-exit-card-dialog"
                    onMouseDown={() => {
                        this.setState({
                            AddEntryExitCardDialog: <AddEntryExitCardDialog
                                OnCancel={() => {
                                    this.setState({
                                        AddEntryExitCardDialog: null,
                                    });
                                }}
                                OnOK={cancelButton => {
                                    cancelButton.click();
                                    this.props.OnDocumentsUpdated();
                                }} />
                        });
                    }}>
                    <span className="fas fa-plus" aria-hidden="true"></span> Entry/Exit Card</button>
                {this.state.AddEntryExitCardDialog}
            </section>
        );
    }
};

export default AddEntryExitCardButton;