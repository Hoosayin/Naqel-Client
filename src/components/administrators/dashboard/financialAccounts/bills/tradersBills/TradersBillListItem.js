import React, { Component } from "react";
import PayProofDialog from "./PayProofDialog";
import Strings from "../../../../../../res/strings";
import PayDetailsDialog from "./PayDetailsDialog";

class TradersBillListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Bill
        } = this.props;

        return <tr>
            <td>
                <strong>{Bill.BillNumber}</strong>
            </td>

            <td>
                {Bill.Paid ?
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}
            </td>

            <td>{Bill.Username}</td>

            <td>{`${Bill.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{`${Bill.FeeRate}%`}</td>

            <td>{`${new Date(Bill.Created).toDateString()}`}</td>

            <td className="text-right">
                {Bill.TraderPayProof ?
                    <button className="btn btn-primary m-t-n"
                        data-toggle="modal"
                        data-target={`#trader-pay-proof-dialog-${Index}`}>Pay Proof</button> : null}

                {Bill.TraderPayDetails ?
                    <button className="btn btn-primary m-t-n"
                        data-toggle="modal"
                        data-target={`#trader-pay-details-dialog-${Index}`}>Pay Details</button> : null}

                {Bill.TraderPayProof ? 
                    <PayProofDialog Index={Index}
                        PayProof={Bill.TraderPayProof} /> : null}

                {Bill.TraderPayDetails ?
                    <PayDetailsDialog Index={Index}
                        PayDetails={Bill.TraderPayDetails} /> : null}
            </td>
        </tr>;
    }
};

export default TradersBillListItem;