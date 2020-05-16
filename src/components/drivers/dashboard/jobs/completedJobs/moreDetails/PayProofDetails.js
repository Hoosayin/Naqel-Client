import React, { Component } from "react";
import TraderPayProofContainer from "../../../../../../containers/traderPayProof/TraderPayProofContainer";
import Preloader from "../../../../../../controls/Preloader";
import { approveTraderPayProof } from "../../../../DriverFunctions";

class PayProofDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onApprovePayment = this.onApprovePayment.bind(this);
    }

    onApprovePayment = async () => {
        if (this.props.PayProof.Approved) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        let approvedTraderPayProof = {
            Token: localStorage.Token,
            TraderPayProofID: this.props.PayProof.TraderPayProofID
        };

        console.log(`Going to approve Trader pay proof.`);

        await approveTraderPayProof(approvedTraderPayProof).then(response => {
            if (response.Message === "Trader pay proof is approved.") {
                this.setState({
                    ShowPreloader: false
                });

                this.props.OnPayProofApproved();
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        const showPreloader = this.state.ShowPreloader;
        const payProof = this.props.PayProof;

        return <section>
            {payProof.Approved ?
                null :
                <div class="alert alert-info m-n p-n">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>PENDING APPROVAL: The trader has updated this pay proof. Tap on the <span className="color-default">Approve</span> button, if you have received the payment.
                                    Afterwards, you will have to pay our job dues from your <span className="color-default">Payments</span> section.</p>
                            </div>
                        </div>
                    </div>
                </div>}
            <TraderPayProofContainer PayProof={payProof} />
            {payProof.Approved ?
                null : 
                <div className="text-right back-color-gray p-xxs">
                    <button className="btn btn-primary m-n" onClick={this.onApprovePayment}>Approve Payment</button>
                </div>}
            {showPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default PayProofDetails;