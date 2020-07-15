import React, { Component } from "react";
import Strings from "../../../../../res/strings";
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
                <h3><span className="fas fa-smile m-r-xxs m-l-xxs"></span>{Dictionary.DriverCompletedTheJob}</h3>
                <div class="type-sh3">Your Approval is Still Required</div>
            </section>;
        }
        else if (hasObjections) {
            JumbotronContent = <h3><span className="fas fa-exclamation m-r-xxs m-l-xxs"></span>{Dictionary.JobTerminiated}</h3>;
        }
        else {
            let dateDifference = loadingDate - new Date();
            const days = Math.floor(dateDifference / 86400000);
            const hours = Math.floor((dateDifference % 86400000) / 3600000);
            const minutes = Math.round(((dateDifference % 86400000) % 3600000) / 60000);

            let dayString = (days > 0) ? `${days} ${Dictionary.Days} ` : "";
            let hourString = (hours > 0) ? `${hours} ${Dictionary.Hours} ` : "";
            let minuteString = (minutes > 0) ? `${minutes} ${Dictionary.Minutes} ` : "";

            let remainingTime = `${Dictionary.TimeLeft}: ${dayString}${hourString}${minuteString}`;

            if (dateDifference < 0) {
                remainingTime = Dictionary.TimePassed;
            }

            JumbotronContent = <section dir={GetDirection()}>
                <h3><span className="fas fa-clock m-l-xxs m-r-xxs"></span>{remainingTime}</h3>
                <div class="type-sh3">
                    <span className="fas fa-tag m-r-xxs"></span>{`${Dictionary.JobCosts}: ${onGoingJob.Price} ${Strings.SAUDI_RIYAL}`}</div>
                <div class="col-md-12 col-md-offset-6">
                    <div class="type-p3">{(onGoingJob.AcceptedDelay > 0) ?
                        <span>
                            <span className="fas fa-leaf m-r-xxxs"></span>
                            <span>{`${Dictionary.AcceptedDelayedHours}: ${onGoingJob.AcceptedDelay}`}</span>
                        </span> :
                        <span>{Dictionary.HopingForDriver}.</span>}
                    </div>
                </div>
            </section>;
        }

        return <section>
            <div class="jumbotron theme-dark" style={{ background: "linear-gradient(to right bottom, #008575, #005162)" }} dir={GetDirection()}>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        DriverCompletedTheJob: "أكمل السائق المهمة",
        JobTerminiated: "تم إنهاء هذه الوظيفة",
        Days: "أيام",
        Hours: "ساعات",
        Minutes: "الدقائق",
        TimeLeft: "الوقت المتبقي للسائق للوصول",
        TimePassed: "لقد مر وقت التحميل",
        JobCosts: "تكاليف هذه الوظيفة",
        AcceptedDelayedHours: "ساعات التأخير المقبولة",
        HopingForDriver: "على أمل أن يكون السائق في الوقت المحدد",
    };
}
else {
    Dictionary = {
        DriverCompletedTheJob: "Driver has Completed the Job",
        JobTerminiated: "This Job is Terminated",
        Days: "Days",
        Hours: "Hours",
        Minutes: "Minutes",
        TimeLeft: "Time left for Driver to Arrive",
        TimePassed: "Loading Time has Passed",
        JobCosts: "THIS JOB COSTS",
        AcceptedDelayedHours: "Accepted Delayed Hours",
        HopingForDriver: "Hoping for the driver to be on time",
    };
}

export default Job;