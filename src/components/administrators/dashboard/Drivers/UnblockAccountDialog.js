import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { unblockDriverAccount } from "../../AdministratorFunctions";

class UnblockAccountDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onUnblock = this.onUnblock.bind(this);
    }

    onUnblock = async () => {
        this.setState({
            ShowPreloader: true
        });

        const unblockedDriver = {
            Token: localStorage.Token,
            DriverID: this.props.Driver.DriverID
        };

        await unblockDriverAccount(unblockedDriver).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Driver account is unblocked.") {
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
            Driver
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`unblock-account-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                                            <div className="type-h3 color-default p-t-n">Unblock Driver</div>
                                            <div className="type-sh3 m-b-xxs">Are you sure you want to unblock
                                                <span className="color-default">{` ${Driver.FirstName} ${Driver.LastName}`}</span>.</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={this.onUnblock}>Unblock</button>
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

export default UnblockAccountDialog;