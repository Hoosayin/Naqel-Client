import React, { Component } from "react";
import JobRequests from "./jobRequests/JobRequests.js"; 
import JobOffers from "./jobOffers/JobOffers.js";
import OnGoingJobs from "./onGoingJobs/OnGoingJobs.js";

class Jobs extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active"><a href="#job-requests" aria-controls="job-requests" role="tab" data-toggle="tab">Job Requests</a></li>
                <li role="presentation"><a href="#job-offers" aria-controls="job-offers" role="tab" data-toggle="tab">Job Offers</a></li>
                <li role="presentation"><a href="#on-going-jobs" aria-controls="on-going-jobs" role="tab" data-toggle="tab">On-Going Jobs</a></li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="job-requests">
                    <JobRequests />
                </div>
                <div role="tabpanel" class="tab-pane" id="job-offers">
                    <JobOffers />
                </div>
                <div role="tabpanel" class="tab-pane" id="on-going-jobs">
                    <OnGoingJobs />
                </div>
            </div>
        </section>;
    }
};

export default Jobs;