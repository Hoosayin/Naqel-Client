import React, { Component } from "react";
import AddCommercialRegisterCertificateDialog from "./AddCommercialRegisterCertificateDialog.js";

class AddCommercialRegisterCertificateButton extends Component {
    constructor() {
        super();

        this.state = {
            AddCommercialRegisterCertificateDialog: null
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
                    data-target="#add-commercial-register-certificate-dialog"
                    onMouseDown={() => {
                        this.setState({
                            AddCommercialRegisterCertificateDialog: <AddCommercialRegisterCertificateDialog
                                OnCancel={() => {
                                    this.setState({
                                        AddCommercialRegisterCertificateDialog: null,
                                    });
                                }}
                                OnOK={cancelButton => {
                                    cancelButton.click();
                                    this.props.OnDocumentsUpdated();
                                }} />
                        });
                    }}>{Dictionary.AddCRCertificate}</button>
                {this.state.AddCommercialRegisterCertificateDialog}
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
        AddCRCertificate: "CR إضافة شهادة"
    };
}
else {
    Dictionary = {
        AddCRCertificate: "Add CR Certificate"
    };
}


export default AddCommercialRegisterCertificateButton;