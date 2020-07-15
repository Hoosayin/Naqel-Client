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
                    }}>{Dictionary.AddEntryExitCard}</button>
                {this.state.AddEntryExitCardDialog}
            </section>
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddEntryExitCard: "إضافة بطاقة دخول / خروج"  
    };
}
else {
    Dictionary = {
        AddEntryExitCard: "Add Entry/Exit Card"
    };
}

export default AddEntryExitCardButton;