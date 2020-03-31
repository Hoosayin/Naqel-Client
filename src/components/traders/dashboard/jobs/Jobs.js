import React, { Component } from "react";
import JobRequests from "./jobRequests/JobRequests.js"; 
import JobOffers from "./jobOffers/JobOffers.js";
import OnGoingJobs from "./onGoingJobs/OnGoingJobs.js";

class Jobs extends Component {
    render() {
        return (
            <section>
                <div className="entity-list theme-alt" style={{ backgroundColor: "#161616" }}>
                    <div className="entity-list-item" href="#job-requests" aria-controls="profile" role="tab" data-toggle="tab">
                        <div className="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/job_requests.png" alt="job_requests.png" />
                        </div>
                        <div className="item-content-secondary">

                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Job Requests</div>
                            <div className="content-text-secondary">Explore job requests from Drivers.</div>
                        </div>
                    </div>
                    <div className="entity-list-item" href="#job-offers" aria-controls="profile" role="tab" data-toggle="tab">
                        <div className="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/job_offers.png" alt="job_offers.png" />
                        </div>
                        <div className="item-content-secondary">
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Job Offers</div>
                            <div className="content-text-secondary">Create job opportunities for places of your own choice.</div>
                        </div>
                    </div>
                    <div className="entity-list-item" href="#on-going-jobs" aria-controls="profile" role="tab" data-toggle="tab">
                        <div className="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/on_going_jobs.png" alt="on_going_jobs.png" />
                        </div>
                        <div className="item-content-secondary">
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">On-Going Jobs</div>
                            <div className="content-text-secondary">Manage your jobs that are in progress.</div>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="job-requests">
                        <JobRequests />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="job-offers">
                        <JobOffers />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="on-going-jobs">
                        <OnGoingJobs />
                    </div>
                </div>
            </section>
        );
    }
};

export default Jobs;