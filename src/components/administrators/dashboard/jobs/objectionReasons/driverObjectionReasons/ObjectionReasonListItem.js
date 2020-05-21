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
                    <button className="btn btn-primary" onClick={this.onVerify}>Verify</button> : null}
                <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
            </td>
        </tr>;
    }
};

export default ObjectionReasonListItem;