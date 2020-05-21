import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";

import {
    deleteTraderObjectionReason,
    verifyTraderObjectionReason
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

        let discardedTraderObjectionReason = {
            Token: localStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await deleteTraderObjectionReason(discardedTraderObjectionReason).then(response => {
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

        let verifiedTraderObjectionReason = {
            Token: localStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await verifyTraderObjectionReason(verifiedTraderObjectionReason).then(response => {
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
                {ObjectionReason.TraderID ?
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span> :
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span>}
            </td>
            <td>{ObjectionReason.Reason}</td>
            <td className="text-right">
                {ObjectionReason.TraderID ?
                    <button className="btn btn-primary" onClick={this.onVerify}>Verify</button> : null}
                <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
            </td>
        </tr>;
    }
};

export default ObjectionReasonListItem;