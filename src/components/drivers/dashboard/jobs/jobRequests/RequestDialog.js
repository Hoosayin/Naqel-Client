import React, { Component } from "react";
import TraderRequestContainer from "../../../../../containers/traderRequest/TraderRequestContainer";

class RequestDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const traderRequest = this.props.TraderRequest;

        return <section>
            <div className="modal modal-center-vertical" id={`request-dialog-${index}`}
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
                            <TraderRequestContainer TraderRequest={traderRequest} />
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default RequestDialog;