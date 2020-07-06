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
                    className="btn btn-primary"
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
                    }}>{Dictionary.AddIdentityCard}</button>
                {this.state.AddIdentityCardDialog}
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
        AddIdentityCard: "أضف بطاقة الهوية"
    };
}
else {
    Dictionary = {
        AddIdentityCard: "Add Identity Card"
    };
}

export default AddIdentityCardButton;