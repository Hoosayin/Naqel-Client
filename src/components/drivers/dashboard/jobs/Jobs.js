import React, { Component } from "react";
import JobRequests from "./jobRequests/JobRequests"; 
import JobOffers from "./jobOffers/JobOffers";
import OnGoingJob from "./onGoingJob/OnGoingJob";
import CompletedJobs from "./completedJobs/CompletedJobs";
import PageHeading from "../../../../controls/PageHeading";

class Jobs extends Component {
    render() {
        return <section>
            <PageHeading Heading="JOBS" />
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#job-requests" aria-controls="job-requests" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshJobRequests(); }}>Job Requests</a>
                </li>
                <li role="presentation">
                    <a href="#job-offers" aria-controls="job-offers" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshJobOffers(); }}>Job Offers</a>
                </li>
                <li role="presentation">
                    <a href="#on-going-job" aria-controls="on-going-job" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshOnGoingJob(); }}>On-Going Job</a>
                </li>
                <li role="presentation">
                    <a href="#completed-jobs" aria-controls="completed-jobs" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshCompletedJobs(); }}>Completed Jobs</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="job-requests">
                    <JobRequests Refresh={refresh => { this.RefreshJobRequests = refresh; }} />
                </div>
                <div role="tabpanel" class="tab-pane" id="job-offers">
                    <JobOffers Refresh={refresh => { this.RefreshJobOffers = refresh; }}/>
                </div>
                <div role="tabpanel" class="tab-pane" id="on-going-job">
                    <OnGoingJob Refresh={refresh => { this.RefreshOnGoingJob = refresh; }} />
                </div>
                <div role="tabpanel" class="tab-pane" id="completed-jobs">
                    <CompletedJobs Refresh={refresh => { this.RefreshCompletedJobs = refresh; }}/>
                </div>
            </div>
        </section>;
    }
};

export default Jobs;