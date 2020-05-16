import React, { Component } from "react";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import PayProofDetails from "./PayProofDetails";
import { getData } from "../../../../DriverFunctions";

class PaymentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TraderPaymentDetails: null,
            Searching: false,
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TraderPaymentDetails",
                Params: {
                    CompletedJobID: this.props.CompletedJobID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Trader payment details found.") {
                    this.setState({
                        TraderPaymentDetails: response.TraderPaymentDetails,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TraderPaymentDetails: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TraderPaymentDetails",
                Params: {
                    CompletedJobID: this.props.CompletedJobID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Trader payment details found.") {
                    this.setState({
                        TraderPaymentDetails: response.TraderPaymentDetails
                    });
                }
                else {
                    this.setState({
                        TraderPaymentDetails: null
                    });
                }
            });
        }
    };

    render() {
        const traderPaymentDetails = this.state.TraderPaymentDetails;
        const searching = this.state.Searching;

        if (searching || !traderPaymentDetails) {
            return <SearchingContainer Searching={searching}
                SearchingFor="payment details" />;
        }
        else {
            return <PayProofDetails PayProof={traderPaymentDetails.PayProof}
                OnPayProofApproved={async () => {
                    this.props.OnPayProofApproved();
                    await this.refresh();
                }} />;
        }
    }
};

export default PaymentDetails;