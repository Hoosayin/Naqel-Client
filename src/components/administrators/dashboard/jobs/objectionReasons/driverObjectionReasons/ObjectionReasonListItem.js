import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";

import {
    deleteDriverObjectionReason,
    verifyDriverObjectionReason
} from "../../../../AdministratorFunctions";

class ObjectionReasonListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowProgressRing: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onVerify = this.onVerify.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let discardedDriverObjectionReason = {
            Token: localStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await deleteDriverObjectionReason(discardedDriverObjectionReason).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Objection reason is deleted.") {
                this.props.OnObjectionReasonUpdated();
            }
        });
    };

    onVerify = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let verifiedDriverObjectionReason = {
            Token: localStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await verifyDriverObjectionReason(verifiedDriverObjectionReason).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Objection reason is verified.") {
                this.props.OnObjectionReasonUpdated();
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            ObjectionReason
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ? 
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>
            <td>
                {ObjectionReason.DriverID ?
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span> :
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span>}
            </td>
            <td>{ObjectionReason.Reason}</td>
            <td className="text-right">
                {ObjectionReason.DriverID ?
                    <button className="btn btn-primary"
                        data-toggle="modal"
                        data-target={`#verify-driver-objection-reason-${Index}`}>Verify</button> : null}
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-driver-objection-reason-${Index}`}>Delete</button>

                <div className="modal modal-center-vertical" id={`delete-driver-objection-reason-${Index}`}
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                        <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                            <div className="modal-header">
                                <div className="text-right">
                                    <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                        data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>
                                        <span className="fas fa-times"></span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-sh3 m-b-xxs">Are you sure you want to delete this objection reason?</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-danger"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onDelete();
                                                    }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal modal-center-vertical" id={`verify-driver-objection-reason-${Index}`}
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                        <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                            <div className="modal-header">
                                <div className="text-right">
                                    <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                        data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>
                                        <span className="fas fa-times"></span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-sh3 m-b-xxs">Are you sure you want to verify this objection reason?</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onVerify();
                                                    }}>Verify</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>;
    }
};

export default ObjectionReasonListItem;