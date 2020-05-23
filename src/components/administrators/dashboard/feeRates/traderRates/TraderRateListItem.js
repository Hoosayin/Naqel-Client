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
                <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>

                <UpdateTraderRateDialog Index={Index}
                    FeeRate={TraderRate.FeeRate}
                    TraderRateID={TraderRate.TraderRateID}
                    OnOK={this.props.OnTraderRateUpdated} />
            </td>
        </tr>;
    }
};

export default TraderRateListItem;