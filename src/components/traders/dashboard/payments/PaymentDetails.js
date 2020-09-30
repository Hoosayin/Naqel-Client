import React, { Component } from "react";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import PayProofDetails from "./PayProofDetails";
import PayDetailsContainer from "../../../../containers/payDetails/PayDetailsContainer";
import { getData } from "../../TraderFunctions";

class PaymentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PaymentDetails: null,
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
                Get: "PaymentDetails",
                Params: {
                    TraderBillID: this.props.TraderBillID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                console.log("PAYMENT");
                console.log(response);
                if (response.Message === "Payment details found.") {
                    this.setState({
                        PaymentDetails: response.PaymentDetails,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        PaymentDetails: null,
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
                Get: "PaymentDetails",
                Params: {
                    TraderBillID: this.props.TraderBillID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Payment details found.") {
                    this.setState({
                        PaymentDetails: response.PaymentDetails
                    });
                }
                else {
                    this.setState({
                        PaymentDetails: null
                    });
                }
            });
        }
    };

    render() {
        const {
            PaymentDetails,
            Searching
        } = this.state;

        if (Searching || !PaymentDetails) {
            return <SearchingContainer Searching={Searching}
                SearchingFor="payment details" />;
        }
        else {
            if (PaymentDetails.IsOnlinePayment) {
                return <PayDetailsContainer PayDetails={PaymentDetails.PayDetails} />
            }
            else {
                const {
                    JobNumber
                } = this.props;

                return <PayProofDetails PayProof={PaymentDetails.PayProof}
                    JobNumber={JobNumber}
                    OnPayProofDeleted={this.props.OnPayProofDeleted} />;
            }
        }
    }
};

export default PaymentDetails;