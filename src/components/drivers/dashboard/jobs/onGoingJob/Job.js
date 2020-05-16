import React, { Component } from "react";
import JobContainer from "../../../../../containers/onGoingJob/JobContainer";

class Job extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onGoingJob = this.props.OnGoingJob;
        const hasObjections = this.props.HasObjections;

        let loadingDate = new Date(onGoingJob.LoadingDate);
        loadingDate.setHours((parseInt(onGoingJob.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(onGoingJob.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(onGoingJob.LoadingTime.substring(6)));

        let JumbotronContent;

        if (onGoingJob.CompletedByDriver) {
            JumbotronContent = <section>
                <h3><span className="fas fa-smile p-r-xxxs"></span>This Job is Completed.</h3>
                <div class="type-sh3">Waiting for Trader's Approval</div>
            </section>;
        }
        else if (hasObjections) {
            JumbotronContent = <h3><span className="fas fa-exclamation p-r-xxxs"></span>This Job is Terminated.</h3>;
        }
        else {
            let dateDifference = loadingDate - new Date();
            const days = Math.floor(dateDifference / 86400000);
            const hours = Math.floor((dateDifference % 86400000) / 3600000);
            const minutes = Math.round(((dateDifference % 86400000) % 3600000) / 60000);

            let dayString = (days > 0) ? `${days} Days ` : "";
            let hourString = (hours > 0) ? `${hours} Hours ` : "";
            let minuteString = (minutes > 0) ? `${minutes} Minutes ` : "";

            let remainingTime = `${dayString}${hourString}${minuteString}Left To Load Cargo`;

            if (dateDifference < 0) {
                remainingTime = "Loading Time has Passed";
            }

            JumbotronContent = <section>
                <h3><span className="fas fa-clock"></span>   {remainingTime}</h3>
                <div class="type-sh3">
                    <span className="fas fa-tag m-r-xxs"></span>{`$${onGoingJob.Price} AMOUNT IS ON YOUR WAY`}</div>
                <div class="col-md-12 col-md-offset-6">
                    <div class="type-p3">{(onGoingJob.AcceptedDelay > 0) ?
                        <span>
                            <span className="fas fa-leaf"></span>
                            <span>{` You have a relaxation of ${onGoingJob.AcceptedDelay} Hours.`}</span>
                        </span> :
                        <span>"You must reach on time to load the cargo."</span>}
                    </div>
                </div>
            </section>;
        }

        return <section>
            <div class="jumbotron theme-dark" style={{ background: "linear-gradient(to right bottom, #008575, #005162)" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-24 text-center">
                            {JumbotronContent}
                        </div>
                    </div>
                </div>
            </div>
            <JobContainer OnGoingJob={onGoingJob} />
        </section>;
    }
};

export default Job;