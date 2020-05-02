import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addOnGoingJobFromJobOffer } from "../../../TraderFunctions";

class ProfileDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onAssignNow = this.onAssignNow.bind(this);
    }

    onAssignNow = async () => {
        if (!this.props.CanAssign()) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newOnGoingJob = {
            Token: localStorage.Token,
            DriverRequestID: this.props.DriverRequestID
        };

        console.log("Going to add on-going job...");

        await addOnGoingJobFromJobOffer(newOnGoingJob).then(response => {
            if (response.Message === "On-going job is added.") {
                this.setState({
                    ShowPreloader: false
                });

                this.cancelButton.click();

                this.props.OnOK();
                return;
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }

            
        });
    };

    render() {
        const index = this.props.Index;
        const driver = this.props.Driver;
        const price = this.props.Price;

        return <section>
            <div className="modal modal-center-vertical" id={`assign-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
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
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>Assigning a New Job</div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-24">
                                            <img alt="dollar.png" src="./images/dollar.png" height="100" />
                                            <div class="type-h4">You are About to Start a New Job with <span class="color-default">{`${driver.FirstName} ${driver.LastName}`}</span>.</div>
                                            <div class="type-sh3">Your Payment Amount is <span class="color-default">{`$${price}`}</span>.</div>
                                            <p><span class="color-default">Important Note:</span> After this step. you'll be engaged in an On-Going Job. Your amount will not be given to the driver without your approval for Job's completion. On cancelling an On-Going Job, your amount will be refunded with a deduction of <span className="color-default">10%.</span></p>
                                            <div class="text-right">
                                                <button class="btn btn-primary" onClick={this.onAssignNow}>Assign Now</button>
                                            </div>
                                        </div>
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

export default ProfileDialog;