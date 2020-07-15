import React, { Component } from "react";
import JobRequests from "./jobRequests/JobRequests"; 
import JobOffers from "./jobOffers/JobOffers";
import OnGoingJob from "./onGoingJob/OnGoingJob";
import CompletedJobs from "./completedJobs/CompletedJobs";
import PageHeading from "../../../../controls/PageHeading";

class Jobs extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="JOBS" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#job-requests" aria-controls="job-requests" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshJobRequests(); }}>{Dictionary.JobRequests}</a>
                </li>
                <li role="presentation">
                    <a href="#job-offers" aria-controls="job-offers" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshJobOffers(); }}>{Dictionary.JobOffers}</a>
                </li>
                <li role="presentation">
                    <a href="#on-going-job" aria-controls="on-going-job" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshOnGoingJob(); }}>{Dictionary.OnGoingJob}</a>
                </li>
                <li role="presentation">
                    <a href="#completed-jobs" aria-controls="completed-jobs" role="tab" data-toggle="tab"
                        onClick={async () => { await this.RefreshCompletedJobs(); }}>{Dictionary.CompletedJobs}</a>
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

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobRequests: "طلبات العمل",
        JobOffers: "عروض العمل",
        OnGoingJob: "العمل الجاري",
        CompletedJobs: "الوظائف المكتملة",
    };
}
else if (Language === "Urdu") {
    Dictionary = {
        JobRequests: "نوکری کی درخواستیں",
        JobOffers: "نوکری کی پیشکش",
        OnGoingJob: "نوکری جاری ہے",
        CompletedJobs: "مکمل نوکریاں",
    };
}
else {
    Dictionary = {
        JobRequests: "Job Requests",
        JobOffers: "Job Offers",
        OnGoingJob: "On-Going Job",
        CompletedJobs: "Completed Jobs",
    };
}


export default Jobs;