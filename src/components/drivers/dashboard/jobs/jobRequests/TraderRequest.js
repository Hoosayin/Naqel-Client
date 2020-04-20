import React, { Component } from "react";
import TraderRequestTab from "./TraderRequestTab";
import TraderTab from "./TraderTab";
import { addOnGoingJob } from "../../../DriverFunctions";

class TraderRequest extends Component {
    constructor(props) {
        super(props);

        this.onStartJob = this.onStartJob.bind(this);
    }

    onStartJob = async traderRequest => {
        if (this.props.DriverOnJob) {
            return;
        }

        const newOnGoingJob = {
            Token: localStorage.Token,
            TraderRequestID: traderRequest.TraderRequestID
        };

        console.log("Going to add On-going job...");

        await addOnGoingJob(newOnGoingJob).then(response => {
            if (response.Message === "On-going job is added.") {
                this.props.OnJobStarted();
            }
        });
    };

    render() {
        const index = this.props.Index;
        const driverOnJob = this.props.DriverOnJob;
        const traderRequestPackage = this.props.TraderRequestPackage;
        const trader = traderRequestPackage.Trader;
        const profilePhoto = traderRequestPackage.ProfilePhoto; 
        const traderRequest = traderRequestPackage.TraderRequest;

        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href={`#trader-request-tab-${index}`} aria-controls={`trader-request-tab-${index}`} role="tab" data-toggle="tab">{`Request # ${index + 1}.`}</a>
                </li>
                <li role="presentation">
                    <a href={`#trader-tab-${index}`} aria-controls={`trader-tab-${index}`} role="tab" data-toggle="tab">{trader.Type}</a>
                </li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id={`trader-request-tab-${index}`}>
                    <TraderRequestTab TraderRequest={traderRequest} Index={index} />
                </div>
                <div role="tabpanel" className="tab-pane" id={`trader-tab-${index}`}>
                    <TraderTab Trader={trader} ProfilePhoto={profilePhoto} />
                </div>
            </div>
            <div style={{ backgroundColor: "#EFEFEF", textAlign: "right", padding: "10px" }}>
                {driverOnJob ? <div class="badge back-color-danger" style={{ marginRight: "5px" }}>YOU ARE ON JOB</div> : null}
                <button className="btn btn-primary" disabled={driverOnJob} onClick={async () => { await this.onStartJob(traderRequest); }}>Start Job</button>
            </div>
       </section>;
    }
};

export default TraderRequest;