import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { chargeTrader } from "../../AdministratorFunctions";

class ChargeTraderDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onCharge = this.onCharge.bind(this);
    }

    onCharge = async () => {
        this.setState({
            ShowPreloader: true
        });

        const chargedTrader = {
            Token: localStorage.Token,
            TraderID: this.props.Trader.TraderID
        };

        await chargeTrader(chargedTrader).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Trader is charged.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            Trader
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`charge-trader-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">Charge Trader</div>
                                            <div className="type-sh3 m-b-xxs">Are you sure you want to charge
                                                <span className="color-default">{` ${Trader.FirstName} ${Trader.LastName}`}</span>? On charging will remove this trader from exonerated list.</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={this.onCharge}>Charge</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default ChargeTraderDialog;