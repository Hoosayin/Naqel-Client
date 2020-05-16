import React, { Component } from "react";
import BillContainer from "../../../../containers/bill/BillContainer";
import PrintBillDialog from "./PrintBillDialog";
import AddPayProofDialog from "./AddPayProofDialog";
import PaymentDetails from "./PaymentDetails";

class BillListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const bill = this.props.Bill;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <BillContainer Index={index} Bill={bill} />

            <div className="text-right back-color-gray p-xxs">
                <button className="btn btn-secondary"
                    data-toggle="modal"
                    data-target={`#print-bill-dialog-${index}`}>Print Bill</button>

                {bill.HasPayProof ?
                    null :
                    <button className="btn btn-primary">Pay Online</button>}

                {bill.HasPayProof ?
                    null : 
                    <button className="btn btn-primary"
                        data-toggle="modal"
                        data-target={`#add-pay-proof-dialog-${index}`}>Upload Pay Proof</button>}
            </div>

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#bill-${index}`}
                onMouseDown={async () => { await this.RefreshPaymentDetails(); }}>
                <div className="type-h4 color-default text-right p-xxxs">Payment Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`bill-${index}`}>
                <PaymentDetails Refresh={refresh => { this.RefreshPaymentDetails = refresh; }}
                    DriverBillID={bill.DriverBillID}
                    OnPayProofDeleted={async () => {
                        this.props.OnPayProofUpdated(bill, false);
                        await this.RefreshPaymentDetails();
                    }} />
            </div>

            <PrintBillDialog Index={index}
                Bill={bill} />
            <AddPayProofDialog Index={index}
                DriverBillID={bill.DriverBillID}
                OnOK={async () => {
                    this.props.OnPayProofUpdated(bill, true);
                    await this.RefreshPaymentDetails();
                }} />
        </li>;
    }
};

export default BillListItem;