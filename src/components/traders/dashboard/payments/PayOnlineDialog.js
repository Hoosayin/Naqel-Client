import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import Preloader from "../../../../controls/Preloader";
import Strings from "../../../../res/strings";
import { getClientSecret, addTraderPayDetails } from "../../TraderFunctions";

class PayOnlineDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Owner: "",
            Email: "",

            ValidOwner: false,
            ValidEmail: false,

            ValidForm: false,
            ShowPreloader: false,
            ShowCard: false,

            Errors: {
                Owner: "",
                Email: "",
                CheckOut: ""
            }
        };

        this.toggleCard = this.toggleCard.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCardInputChange = this.onCardInputChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount() {
        this.props.ToggleCard(this.toggleCard);
    }

    onCardInputChange = event => {
        let Errors = this.state.Errors;
        Errors.CheckOut = event.error ? event.error.message : "";

        this.setState({
            Errors: Errors
        });
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidOwner = this.state.ValidOwner;
        let ValidEmail = this.state.ValidEmail;

        switch (field) {
            case "Owner":
                ValidOwner = (value !== "");
                Errors.Owner = ValidOwner ? "" : "Card owner name is required.";

                if (Errors.Owner !== "") {
                    break;
                }

                ValidOwner = value.match(/^[a-zA-Z ]+$/);
                Error.Owner = ValidOwner ? "" : "Invalid owner name.";
                break;
            case "Email":
                ValidEmail = (value !== "");
                Errors.Email = ValidEmail ? "" : "Email is required.";

                if (Errors.NewEmail != "") {
                    break;
                }

                ValidEmail = (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
                Errors.Email = ValidEmail ? "" : "Email is invalid.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidOwner: ValidOwner,
            ValidEmail: ValidEmail,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidOwner &&
                        this.state.ValidEmail
            });
        });
    }

    toggleCard = toggle => {
        this.setState({
            ShowCard: toggle
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const bill = this.props.Bill;

        const billingDetails = {
            name: this.state.Owner,
            email: this.state.Email
        };

        const newClientSecret = {
            Token: sessionStorage.Token,
            Amount: bill.Amount * 100
        };

        const stripe = this.props.Stripe;
        const elements = this.props.Elements;

        const cardElement = elements.getElement(CardElement);

        try {
            await getClientSecret(newClientSecret).then(async response => {
                if (response.Message === "Client secret found.") {
                    const clientSecret = response.ClientSecret;

                    const paymentMethodRequest = await stripe.createPaymentMethod({
                        type: "card",
                        card: cardElement,
                        billing_details: billingDetails
                    });

                    if (paymentMethodRequest.error) {
                        let Errors = this.state.Errors;
                        Errors.CheckOut = paymentMethodRequest.error.message;

                        this.setState({
                            Errors: Errors,
                            ShowPreloader: false
                        });

                        return;
                    }

                    const newTraderPayDetails = {
                        Token: sessionStorage.Token,
                        TraderBillID: this.props.Bill.TraderBillID,
                        OwnerName: this.state.Owner,
                        OwnerEmail: this.state.Email,
                        CardType: paymentMethodRequest.paymentMethod.card.brand
                    };

                    const { error } = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: paymentMethodRequest.paymentMethod.id
                    });

                    if (error) {
                        let Errors = this.state.Errors;
                        Errors.CheckOut = error.message;

                        this.setState({
                            Errors: Errors,
                            ShowPreloader: false
                        });

                        return;
                    }

                    await addTraderPayDetails(newTraderPayDetails).then(response => {
                        this.setState({
                            ShowPreloader: false
                        });

                        if (response.Message === "Pay details are added.") {
                            this.toggleCard(false);
                            this.cancelButton.click();
                            this.props.OnOK();
                        }
                    });
                }
                else {
                    this.setState({
                        ShowPreloader: false
                    });
                }
            });
        } catch (error) {
            let Errors = this.state.Errors;
            Errors.CheckOut = error.message;

            this.setState({
                Errors: Errors
            });
        }
    }

    render() {
        const {
            ShowCard
        } = this.state;

        const showPreloader = this.state.ShowPreloader;
        const index = this.props.Index;
        const bill = this.props.Bill;

        const iframeStyles = {
            base: {
                color: "#000000",
                fontSize: "15px",
                fontFamily: "Segoe UI",
                iconColor: "#000000"
            },
            invalid: {
                iconColor: "#D75A4A",
                color: "#D75A4A"
            },
            complete: {
                iconColor: "#008575"
            }
        };

        const cardElementOpts = {
            iconStyle: "solid",
            style: iframeStyles,
            hidePostalCode: true
        };

        return <section>
            <div className="modal modal-center-vertical" id={`pay-online-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {showPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    onClick={() => { this.toggleCard(false); }}
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">Pay Online</div>
                                                <div className="type-sh3 m-b-xxs">Pay the bill with your credit card.</div>
                                                <div className="form-group">
                                                    <label className="control-label">Owner Name</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Owner" className="form-control" autoComplete="off"
                                                        value={this.state.Owner} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Owner}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Owner Email</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="email" name="Email" className="form-control" autoComplete="off"
                                                        placeholder="someone@mail.com" value={this.state.Email} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Email}</span>
                                                </div>

                                                <div className="type-sh4">
                                                    <span className="fab fa-cc-visa"></span>
                                                    <span className="fab fa-cc-mastercard m-l-xxxs"></span>
                                                    <span className="fab fa-cc-amex m-l-xxxs"></span>
                                                    <span className="fab fa-cc-discover m-l-xxxs"></span>
                                                    <span className="fab fa-cc-diners-club m-l-xxxs"></span>
                                                    <span className="fab fa-cc-jcb m-l-xxxs"></span>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label">Credit Card Information</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <div className="form-control p-t-xxxs p-b-xxxs"
                                                        style={{
                                                            maxWidth: "100%",
                                                            width: "100%",
                                                            borderColor: "rgba(0, 0, 0, 0.6)"
                                                        }}>
                                                        {ShowCard ? 
                                                            <CardElement
                                                                options={cardElementOpts}
                                                                onChange={this.onCardInputChange} /> : null}
                                                    </div>
                                                    <span className="text-danger">{this.state.Errors.CheckOut}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={`Pay ${bill.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`} className="btn btn-primary" disabled={!this.state.ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default PayOnlineDialog;