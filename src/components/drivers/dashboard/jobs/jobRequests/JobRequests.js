import React, { Component } from "react";
import jwt_decode from "jwt-decode";
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
        const jobRequests = jwt_decode(localStorage.userToken).JobRequests;

        if (jobRequests) {
            this.setState({
                JobRequestsList: null
            });
            this.setState({
                JobRequestsList: <JobRequestsList OnJobRequestsUpdated={this.onJobRequestsUpdated} />
            });
        }
        else {
            this.setState({
                JobRequestsList: null
            });
        }
    }

    render() {
        return (
            <section>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Job Requests</div>
                                <div class="type-sh3">Manage Your Job Requests</div>
                                <p>Create new job requests for your current and/or near-by locations to get a chance to increase your revenue.</p>
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#add-job-request-dialog"
                                        onMouseDown={() => {
                                            this.setState({
                                                AddJobRequestDialog: (<AddJobRequestDialog
                                                    OnCancel={() => {
                                                        this.setState({
                                                            AddJobRequestDialog: null,
                                                        });
                                                    }}
                                                    OnOK={cancelButton => {
                                                        cancelButton.click();
                                                        this.onJobRequestsUpdated();
                                                    }} />),
                                            });
                                        }}>
                                        New Job Request
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.AddJobRequestDialog}
                {this.state.JobRequestsList}
            </section>
        );
    }
};

export default JobRequests;