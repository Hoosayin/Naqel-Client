import React, { Component } from "react";
import JobRequests from "./jobRequests/JobRequests.js"; 
import JobOffers from "./jobOffers/JobOffers.js";
import OnGoingJobs from "./onGoingJobs/OnGoingJobs.js";

class Jobs extends Component {
    render() {
        return (
            <section>
                <div class="entity-list theme-alt" style={{ backgroundColor: "#161616" }}>
                    <div class="entity-list-item" href="#job-requests" aria-controls="profile" role="tab" data-toggle="tab">
                        <div class="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/job_requests.png" alt="job_requests.png" />
                        </div>
                        <div class="item-content-secondary">
                            
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">Job Requests</div>
                            <div class="content-text-secondary">Explore job requests from Drivers.</div>     
                        </div>
                    </div>
                    <div class="entity-list-item" href="#job-offers" aria-controls="profile" role="tab" data-toggle="tab">
                        <div class="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/job_offers.png" alt="job_offers.png" />
                        </div>
                        <div class="item-content-secondary">
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">Job Offers</div>
                            <div class="content-text-secondary">Create job opportunities for places of your own choice.</div>
                        </div>
                    </div>
                    <div class="entity-list-item" href="#on-going-jobs" aria-controls="profile" role="tab" data-toggle="tab">
                        <div class="item-icon" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                            <img src="./images/on_going_jobs.png" alt="on_going_jobs.png" />
                        </div>
                        <div class="item-content-secondary">
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">On-Going Jobs</div>
                            <div class="content-text-secondary">Manage your jobs that are in progress.</div>
                        </div>
                    </div>
                </div>

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
            </section>
        );
    }
};

export default Jobs;