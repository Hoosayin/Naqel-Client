import React, { Component } from "react";
import AddJobRequestDialog from "./AddJobRequestDialog.js";
import JobRequestsList from "./JobRequestsList.js";

class JobRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddJobRequestDialog: null,
            JobRequestsList: null
        };

        this.onJobRequestsUpdated = this.onJobRequestsUpdated.bind(this);
    }

    componentDidMount() {
        this.onJobRequestsUpdated();
    }

    onJobRequestsUpdated = () => {
        this.JobRequestsList.onComponentUpdated();
    }

    render() {
        return (
            <section>
                <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Requests</div>
                                <div className="type-sh3">Manage Your Job Requests</div>
                                <p>Create new job requests for your current and/or near-by locations to get a chance to increase your revenue.</p>
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#add-job-request-dialog">New Job Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <JobRequestsList ref={jobRequestsList => this.JobRequestsList = jobRequestsList} />
                {this.state.AddJobRequestDialog}
                <AddJobRequestDialog
                    OnCancel={() => {}}
                    OnOK={cancelButton => {
                        cancelButton.click();
                        this.onJobRequestsUpdated();
                    }} />
            </section>
        );
    }
};

export default JobRequests;