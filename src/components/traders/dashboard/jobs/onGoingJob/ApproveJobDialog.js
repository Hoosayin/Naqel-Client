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
                this.props.OnOK();
                return;
            }

            this.setState({
                ShowPreloader: false
            });
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
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>Approve Completion</div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-24">
                                            <img alt="stamp.png" src="./images/stamp.png" height="100" />
                                            <div class="type-h3">Your Driver has Finished the Job</div>
                                            <div class="type-sh3">We Hope Your Cargo is Delivered</div>
                                            <p><span class="color-default">Note:</span> Report or Approve the Completion! After approving completion, you can view this job in your <span class="color-default">Completed Jobs</span> tab. You'll also be able to rate and review this driver from there.</p>
                                            <div class="text-right">
                                                <button class="btn btn-primary" onClick={this.onApprove}>Approve</button>
                                                <button class="btn btn-secondary">Report</button>
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