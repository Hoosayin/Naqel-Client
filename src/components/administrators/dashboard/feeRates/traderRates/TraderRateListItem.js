import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import UpdateTraderRateDialog from "./UpdateTraderRateDialog";
import { deleteTraderRate } from "../../../AdministratorFunctions";

class TraderRateListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowProgressRing: false
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let discardedTraderRate = {
            Token: localStorage.Token,
            TraderRateID: this.props.TraderRate.TraderRateID
        };

        await deleteTraderRate(discardedTraderRate).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Trader rate is deleted.") {
                this.props.OnTraderRateDeleted(this.props.TraderRate);
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            TraderRate
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ? 
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>

            <td>{TraderRate.Username}</td>
            <td>{`${TraderRate.FeeRate}%`}</td>

            <td className="text-right">
                <button className="btn btn-secondary"
                    data-toggle="modal"
                    data-target={`#update-trader-rate-dialog-${Index}`}>Edit Fee Rate</button>
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-trader-rate-dialog-${Index}`}>Delete</button>

                <UpdateTraderRateDialog Index={Index}
                    FeeRate={TraderRate.FeeRate}
                    TraderRateID={TraderRate.TraderRateID}
                    OnOK={this.props.OnTraderRateUpdated} />

                <div className="modal modal-center-vertical" id={`delete-trader-rate-dialog-${Index}`}
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
                                                <div className="type-sh3 m-b-xxs">Are you sure you want to delete this fee rate?</div>
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
            </td>
        </tr>;
    }
};

export default TraderRateListItem;