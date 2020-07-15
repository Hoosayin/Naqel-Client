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
                <h3><span className="fas fa-smile p-r-xxxs"></span>{Dictionary.JobCompleted}</h3>
                <div class="type-sh3">{Dictionary.WaitingForApproval}</div>
            </section>;
        }
        else if (hasObjections) {
            JumbotronContent = <h3><span className="fas fa-exclamation p-r-xxxs"></span>{Dictionary.JobTerminated}</h3>;
        }
        else {
            let dateDifference = loadingDate - new Date();
            const days = Math.floor(dateDifference / 86400000);
            const hours = Math.floor((dateDifference % 86400000) / 3600000);
            const minutes = Math.round(((dateDifference % 86400000) % 3600000) / 60000);

            let dayString = (days > 0) ? `${days} ${Dictionary.Days} ` : "";
            let hourString = (hours > 0) ? `${hours} ${Dictionary.Hours} ` : "";
            let minuteString = (minutes > 0) ? `${minutes} ${Dictionary.Minutes} ` : "";

            let remainingTime = `${Dictionary.TimeLeftToLoadCargo} ${dayString}${hourString}${minuteString}`;

            if (dateDifference < 0) {
                remainingTime = Dictionary.LoadingTimePassed;
            }

            JumbotronContent = <section>
                <h3><span className="fas fa-clock m-r-xxs"></span>{remainingTime}</h3>
                <div class="type-sh3">
                    <span className="fas fa-tag m-r-xxs"></span>{`${Dictionary.PriceOnYourWay} ${onGoingJob.Price} ${Strings.SAUDI_RIYAL}`}</div>
                <div class="col-md-12 col-md-offset-6">
                    <div class="type-p3">{(onGoingJob.AcceptedDelay > 0) ?
                        <span>
                            <span className="fas fa-leaf m-r-xxxs"></span>
                            <span>{`${Dictionary.Relaxation} ${onGoingJob.AcceptedDelay}`}</span>
                        </span> :
                        <span>{Dictionary.ReachOnTime}</span>}
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobCompleted: "اكتملت هذه المهمة.",
        WaitingForApproval: "في انتظار موافقة التاجر",
        JobTerminated: ".تم إنهاء هذه الوظيفة",
        Days: "أيام",
        Hours: "ساعات",
        Minutes: "الدقائق",
        TimeLeftToLoadCargo: "الوقت المتبقي لتحميل البضائع:",
        LoadingTimePassed: "لقد مر وقت التحميل",
        PriceOnYourWay: ":السعر على طريقتك",
        Relaxation: ":لديك الاسترخاء لساعات",
        ReachOnTime: ".يجب أن تصل في الوقت المحدد لتحميل البضائع",
    };
}
else {
    Dictionary = {
        JobCompleted: "This Job is Completed.",
        WaitingForApproval: "Waiting for Trader's Approval",
        JobTerminated: "This Job is Terminated.",
        Days: "Days",
        Hours: "Hours",
        Minutes: "Minutes",
        TimeLeftToLoadCargo: "Time Left To Load Cargo:",
        LoadingTimePassed: "Loading Time has Passed",
        PriceOnYourWay: "PRICE ON YOUR WAY:",
        Relaxation: "You have relaxation for hours:",
        ReachOnTime: "You must reach on time to load the cargo.",
    };
}

export default Job;