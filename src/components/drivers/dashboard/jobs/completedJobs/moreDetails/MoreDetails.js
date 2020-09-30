import React, { Component } from "react";
import TraderContainer from "../../../../../../containers/trader/TraderContainer";
import PaymentDetails from "./PaymentDetails";

class MoreDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const traderID = this.props.TraderID;
        const completedJobID = this.props.CompletedJobID;

        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href={`#trader-completed-jobs-${index}`} aria-controls={`trader-completed-jobs-${index}`} role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshTraderContainer(); }}>{Dictionary.Trader}</a>
                </li>
                <li role="presentation">
                    <a href={`#payment-details-completed-jobs-${index}`} aria-controls={`payment-details-completed-jobs-${index}`} role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshPaymentDetails(); }}>{Dictionary.PaymentDetails}</a>
                </li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id={`trader-completed-jobs-${index}`}>
                    <TraderContainer Refresh={refresh => { this.RefreshTraderContainer = refresh; }} TraderID={traderID} />
                </div>
                <div role="tabpanel" className="tab-pane" id={`payment-details-completed-jobs-${index}`}>
                    <PaymentDetails Refresh={refresh => { this.RefreshPaymentDetails = refresh; }} CompletedJobID={completedJobID}
                        OnPayProofApproved={this.props.OnPayProofApproved} />
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
        PaymentDetails: "بيانات الدفع",
    };
}
else {
    Dictionary = {
        Trader: "Trader",
        PaymentDetails: "Payment Details",
    };
}

export default MoreDetails;