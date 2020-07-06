import React, { Component } from "react";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import DocumentsContainer from "../../../../../containers/driver/documents/DocumentsContainer";

class ProfileDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            DriverID,
            RefreshDocuments,
            RefreshDriver
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`driver-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <section>
                                <ul className="nav nav-tabs tabs-light" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href={`#driver-tab-${Index}`} aria-controls={`driver-tab-${Index}`} role="tab" data-toggle="tab">{Dictionary.Driver}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={`#documents-tab-${Index}`} aria-controls={`documents-tab-${Index}`} role="tab" data-toggle="tab">{Dictionary.Documents}</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id={`driver-tab-${Index}`}>
                                        <DriverContainer Refresh={RefreshDriver} DriverID={DriverID} TabView={true} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id={`documents-tab-${Index}`}>
                                        <DocumentsContainer Refresh={RefreshDocuments} DriverID={DriverID} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Driver: "سائق",
        Documents: "مستندات"
    };
}
else {
    Dictionary = {
        Driver: "Driver",
        Documents: "Documents"
    };
}

export default ProfileDialog;