import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import DriverTab from "./DriverTab";
import TruckTab from "./TruckTab";
import JobRequestTab from "./JobRequestTab";
import SendTraderRequestDialog from "./SendTraderRequestDialog";
import { deleteTraderRequest } from "../../../TraderFunctions";

class JobRequestPostListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onCancelRequest = this.onCancelRequest.bind(this);
    }

    onCancelRequest = async jobRequest => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedTraderRequest = {
            Token: localStorage.Token,
            JobRequestID: jobRequest.JobRequestID
        };

        console.log(`Going to delete Trader request...`);

        await deleteTraderRequest(discardedTraderRequest).then(response => {
            if (response.Message === "Trader request is deleted.") {
                this.props.OnRequestUpdated(jobRequest, false);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        const index = this.props.Index;
        const jobRequest = this.props.JobRequestPost.JobRequest;
        const driver = this.props.JobRequestPost.Driver;
        const driverProfilePhoto = this.props.JobRequestPost.DriverProfilePhoto;
        const truck = this.props.JobRequestPost.Truck;
        const trailers = this.props.JobRequestPost.Trailers;
        const requestSent = this.props.JobRequestPost.RequestSent;

        const documents = {
            IdentityCard: this.props.JobRequestPost.IdentityCard,
            DrivingLicence: this.props.JobRequestPost.DrivingLicence,
            EntryExitCard: this.props.JobRequestPost.EntryExitCard
        };

        return <section>
            <li className="list-items-row" style={{ borderTop: "2px solid #EAEAEA" }}>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#job-request-post-${index}`}>
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <img src={driverProfilePhoto ? driverProfilePhoto : "./images/defaultProfilePhoto.png"} alt="defaultProfilePhoto.png" />
                            </div>
                            <div className="item-content-secondary">
                                <div className="content-text-primary">{jobRequest.LoadingPlace}
                                </div>
                                <div className="content-text-secondary">{jobRequest.UnloadingPlace}
                                </div>
                            </div>
                            <div className="item-content-primary">
                                {requestSent ? 
                                    <div className="content-text-primary">{driver.FirstName} {driver.LastName}
                                        <span className="fas fa-paper-plane" style={{ color: "#008575", fontSize: "x-small" }}></span>
                                        <span style={{ color: "#008575", fontSize: "x-small" }}>REQUEST SENT</span>
                                    </div> :
                                    <div className="content-text-primary">{driver.FirstName} {driver.LastName}</div>}
                                <div className="content-text-secondary">
                                    <div>
                                        <span className="fas fa-globe-asia" style={{ color: "#707070" }}></span> . {new Date(jobRequest.TimeCreated).toDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse" id={`job-request-post-${index}`}>
                    <ul className="nav nav-tabs" role="tablist"
                        style={{
                            padding: "10px",
                            backgroundColor: "#EFEFEF",
                            width: "100%",
                            margin: "0px"
                        }}>
                        <li role="presentation" className="active"><a href={`#job-request-${index}`} aria-controls={`job-request-${index}`} role="tab" data-toggle="tab">Job Request</a></li>
                        <li role="presentation"><a href={`#driver-${index}`} aria-controls={`driver-${index}`} role="tab" data-toggle="tab">Driver</a></li>
                        <li role="presentation"><a href={`#truck-${index}`} aria-controls={`truck-${index}`} role="tab" data-toggle="tab">Truck</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={`job-request-${index}`}>
                            <JobRequestTab JobRequest={jobRequest} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`driver-${index}`}>
                            <DriverTab Driver={driver} DriverProfilePhoto={driverProfilePhoto} Documents={documents} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`truck-${index}`}>
                            <TruckTab Truck={truck} Trailers={trailers} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#EFEFEF", textAlign: "right", padding: "10px" }}>
                        {requestSent ? <button className="btn btn-secondary" onClick={async () => { await this.onCancelRequest(jobRequest); }}>Cancel Request</button> :
                            <button className="btn btn-primary" data-toggle="modal"
                                data-target={`#send-trader-reqeust-dialog-${index}`}>Send Request</button>}
                    </div>
                </div>
                <SendTraderRequestDialog
                    DialogID={index}
                    JobRequest={jobRequest}
                    IsRequestSent={() => { return requestSent; }}
                    OnOK={() => { this.props.OnRequestUpdated(jobRequest, true); }} />
            </li>
            {this.state.Preloader}
        </section>;     
    }
};

export default JobRequestPostListItem;