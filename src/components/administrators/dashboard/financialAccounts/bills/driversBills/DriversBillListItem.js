import React, { Component } from "react";
import PayProofDialog from "./PayProofDialog";
import PayDetailsDialog from "./PayDetailsDialog";

class DriversBillListItem extends Component {
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

            <td>{`$${Bill.Amount.toFixed(2)}`}</td>

            <td>{`${new Date(Bill.Created).toDateString()}`}</td>

            <td className="text-right">
                {Bill.DriverPayProof ?
                    <button className="btn btn-primary m-t-n"
                        data-toggle="modal"
                        data-target={`#driver-pay-proof-dialog-${Index}`}>Pay Proof</button> : null}

                {Bill.DriverPayDetails ?
                    <button className="btn btn-primary m-t-n"
                        data-toggle="modal"
                        data-target={`#driver-pay-details-dialog-${Index}`}>Pay Details</button> : null}

                {Bill.DriverPayProof ?
                    <PayProofDialog Index={Index}
                        PayProof={Bill.DriverPayProof}
                        OnOK={() => { this.props.OnPayProofApproved(Bill); }} /> : null}

                {Bill.DriverPayDetails ?
                    <PayDetailsDialog Index={Index}
                        PayDetails={Bill.DriverPayDetails} /> : null}
            </td>
        </tr>;
    }
};

export default DriversBillListItem;