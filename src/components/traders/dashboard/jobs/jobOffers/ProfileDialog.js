import React, { Component } from "react";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import DocumentsContainer from "../../../../../containers/driver/documents/DocumentsContainer";

class ProfileDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;

        return <section>
            <div className="modal modal-center-vertical" id={`profile-dialog-${index}`}
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
                                        <a href={`#driver-tab-${index}`} aria-controls={`driver-tab-${index}`} role="tab" data-toggle="tab">Driver</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={`#documents-tab-${index}`} aria-controls={`documents-tab-${index}`} role="tab" data-toggle="tab">Documents</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id={`driver-tab-${index}`}>
                                        <DriverContainer Refresh={this.props.RefreshDriver} DriverID={this.props.DriverID} TabView={true} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id={`documents-tab-${index}`}>
                                        <DocumentsContainer Refresh={this.props.RefreshDocuments} DriverID={this.props.DriverID} />
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

export default ProfileDialog;