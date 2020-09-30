import React, { Component } from "react";
import TraderContainer from "../../../../../containers/trader/TraderContainer";
import DocumentsContainer from "../../../../../containers/trader/documents/DocumentsContainer";

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
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
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
                                        <a href={`#trader-tab-${index}`} aria-controls={`trader-tab-${index}`} role="tab" data-toggle="tab">{Dictionary.Trader}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={`#documents-tab-${index}`} aria-controls={`documents-tab-${index}`} role="tab" data-toggle="tab">{Dictionary.Documents}</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id={`trader-tab-${index}`}>
                                        <TraderContainer Refresh={this.props.RefreshTrader} TraderID={this.props.TraderID} TabView={true} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id={`documents-tab-${index}`}>
                                        <DocumentsContainer Refresh={this.props.RefreshDocuments} TraderID={this.props.TraderID} />
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
        Trader: "التاجر",
        Documents: "مستندات"
    };
}
else {
    Dictionary = {
        Trader: "Trader",
        Documents: "Documents"
    };
}

export default ProfileDialog;