import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { clearTemporaryFeeRate } from "../../../../AdministratorFunctions";

class ClearTemporaryFeeRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onClear = this.onClear.bind(this);
    }

    onClear = async () => {
        this.setState({
            ShowPreloader: true
        });

        const clearedTemporaryFeeRate = {
            Token: localStorage.Token
        };

        await clearTemporaryFeeRate(clearedTemporaryFeeRate).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Temporary fee rate is cleared.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`clear-temporary-fee-rate-dialog`}
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
                                            <div className="type-h3 color-default p-t-n">Clear Temporary Fee Rate</div>
                                            <div className="type-sh3 m-b-xxs">Are you sure you want to clear temporary fee rate before its due date?</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-danger" onClick={this.onClear}>Clear</button>
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

export default ClearTemporaryFeeRateDialog;