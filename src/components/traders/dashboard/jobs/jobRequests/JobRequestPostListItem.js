import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../../containers/truck/TruckContainer";
import JobRequestContainer from "../../../../../containers/jobReqeust/JobRequestContainer";
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
        const requestSent = this.props.JobRequestPost.RequestSent;

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron p-xxxs" style={{ backgroundColor: "#F2F2F2" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h5" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${index + 1}. Job Request By ${driver.FirstName} ${driver.LastName}`}
                                    {requestSent ? <span class="badge back-color-default m-l-xxs">REQUEST SENT</span>: null}
                                </div>
                                <div className="type-sh6">
                                    <span className="fas fa-clock m-r-xxxs" style={{ color: "#606060" }}></span>{`Posted on ${new Date(jobRequest.TimeCreated).toDateString()}.`}
                                </div>
                                <div class="type-sh6">
                                    <span className="fas fa-map-marker-alt m-r-xxxs" style={{ color: "#606060" }}></span>{`From ${jobRequest.LoadingPlace} to ${jobRequest.UnloadingPlace} at $${jobRequest.Price}.`}
                                </div>
                                {requestSent ?
                                    <button className="btn btn-secondary"
                                        onClick={async () => {
                                            await this.onCancelRequest(jobRequest);
                                        }}>Cancel Request</button> :
                                    <button className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={`#send-trader-reqeust-dialog-${index}`}>Send Request</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#job-request-post-${index}`}>
                    <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>
                        {"   More Details"} <i className="fas fa-ellipsis-v"></i>
                        <i class="glyph glyph-add"></i>
                        <i class="glyph glyph-remove"></i>
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
                            <JobRequestContainer JobRequest={jobRequest} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`driver-${index}`}>
                            <DriverContainer DriverID={jobRequest.DriverID} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`truck-${index}`}>
                            <TruckContainer DriverID={jobRequest.DriverID} />
                        </div>
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