import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { approveJob } from "../../../TraderFunctions";

class ApproveJobDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onApprove = this.onApprove.bind(this);
    }

    onApprove = async () => {
        this.setState({
            ShowPreloader: true
        });

        const approvedJob = {
            Token: localStorage.Token,
        }

        console.log("Going to approve the job...");

        await approveJob(approvedJob).then(response => {
            if (response.Message === "Job is approved.") {
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
        return <section>
            <div className="modal modal-center-vertical" id="approve-job-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary"
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-24">
                                            <img alt="stamp.png" src="./images/stamp.png" height="100" />
                                            <div class="type-h3">Approve Completion</div>
                                            <div class="type-sh3">Your driver has finished the job. We hope your cargo is delivered.</div>
                                            <p><span class="color-default">Note:</span> After approving completion, you can view this job in your <span class="color-default">Completed Jobs</span> tab. You can also rate and review this driver from there. You have to pay the bill from the <span class="color-default">Payments</span> section.</p>
                                            <div class="text-right">
                                                <button class="btn btn-primary" onClick={this.onApprove}>Approve</button>
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

export default ApproveJobDialog;