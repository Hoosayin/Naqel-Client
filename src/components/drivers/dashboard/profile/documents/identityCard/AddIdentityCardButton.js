import React, { Component } from "react";
import AddIdentityCardDialog from "./AddIdentityCardDialog.js";

class AddIdentityCardButton extends Component {
    constructor() {
        super();

        this.state = {
            AddIdentityCardDialog: null,
        };
    }

    render() {
        return (
            <section>
                <button
                    type="button"
                    class="btn btn-primary"
                    style={{ minWidth: "152px" }}
                    data-toggle="modal"
                    data-target="#add-identity-card-dialog"
                    onMouseDown={() => {
                        this.setState({
                            AddIdentityCardDialog: <AddIdentityCardDialog
                                OnCancel={() => {
                                    this.setState({
                                        AddIdentityCardDialog: null,
                                    });
                                }}
                                OnOK={cancelButton => {
                                    cancelButton.click();
                                    this.props.OnDocumentsUpdated();
                                }} />,
                        });
                    }}>
                    <span class="fas fa-plus" aria-hidden="true"></span> Identity Card
                </button>
                {this.state.AddIdentityCardDialog}
            </section>
        );
    }
};

export default AddIdentityCardButton;