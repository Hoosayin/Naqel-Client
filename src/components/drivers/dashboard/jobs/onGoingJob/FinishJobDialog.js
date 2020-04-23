import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import { finishJob } from "../../../DriverFunctions";

class FinishJobDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Progress: null
        };

        this.onYes = this.onYes.bind(this);
    }

    onYes = async () => {
        this.setState({
            Progress: true
        });

        const finishedJob = {
            Token: localStorage.Token,
        }

        console.log("Going to finish the job...");

        await finishJob(finishedJob).then(response => {
            if (response.Message === "Job is finished.") {
                this.props.OnOK();
            }

            this.setState({
                Progress: false
            });
        });
    }

    render() {
        const completedByDriver = this.props.CompletedByDriver;

        return <section>
            <div className="modal modal-center-vertical" id="finish-job-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            {this.state.Progress ? <ProgressRing /> : null}
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>Finish Job</div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron">
                                <div class="container">
                                    {/**/}
                                    <div class="row">
                                        {completedByDriver ? 
                                            <div class="col-md-24">
                                                <img alt="confetti.png" src="./images/confetti.png" height="100" />
                                                <div class="type-h3">Congratulations! You Have Completed Your Job</div>
                                                <div class="type-sh3">The Trader's Approval is Pending at the Moment</div>
                                                <p><span class="color-default">Important Note:</span> You can view this job in <span class="color-default">Completed Jobs</span> tab, once the trader approves job completion.</p>
                                            </div> : 
                                            <div class="col-md-24">
                                                <p>Are you sure you want to finish this job? Your trader will approve job completion afterwards!</p>
                                                <div class="text-right">
                                                    <button class="btn btn-primary" onClick={this.onYes}>Yes</button>
                                                </div>
                                            </div>}
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

export default FinishJobDialog;