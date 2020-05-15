import React, { Component } from "react";
import UUID from "uuid-v4";
import Preloader from "../../../../../controls/Preloader";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../../containers/truck/TruckContainer";
import JobRequestContainer from "../../../../../containers/jobReqeust/JobRequestContainer";
import SendTraderRequestDialog from "./SendTraderRequestDialog";
import TraderRequestDialog from "./TraderRequestDialog";
import AssignJobDialog from "./AssignJobDialog";
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
                this.props.OnRequestUpdated(jobRequest, null);
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
        const driverOnJob = this.props.JobRequestPost.DriverOnJob;
        const traderOnJob = this.props.TraderOnJob;
        const traderRequest = this.props.JobRequestPost.TraderRequest;
        const canAssign = !driverOnJob && !traderOnJob;

        const assignJobIndex = UUID();

        let Badge;

        if (traderRequest) {
            Badge = traderRequest.Selected ?
                <span class="badge back-color-golden m-l-xxs">REQUEST ACCEPTED</span> :
                <span class="badge back-color-default m-l-xxs">REQUEST SENT</span>;
        }
        else {
            Badge = null;
        }

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron p-xxxs back-color-gray">
                    <div className="container">
                        <div className="row">
                            <div className="type-h5 color-default p-t-n">
                                {`${index + 1}.`}
                                {Badge}
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-user"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Posted By</div>
                                            <div className="content-text-secondary">{`${driver.FirstName} ${driver.LastName}`}
                                                {driverOnJob ?
                                                    <span class="badge back-color-danger m-l-xxs">ON JOB</span> :
                                                    null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-clock"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Posted On</div>
                                            <div className="content-text-secondary">{new Date(jobRequest.TimeCreated).toDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-tag"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Price</div>
                                            <div className="content-text-secondary">{`$${jobRequest.Price}`}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas  fa-map-marker-alt"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">From </div>
                                            <div className="content-text-secondary">{jobRequest.LoadingPlace}</div>
                                            <div className="content-text-primary">To</div>
                                            <div className="content-text-secondary">{jobRequest.UnloadingPlace}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                {traderRequest ?
                                    <section>
                                        <button className="btn btn-secondary"
                                            onClick={async () => { await this.onCancelRequest(jobRequest); }}>Cancel Request</button>
                                        <button className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target={`#trader-request-dialog-${index}`}>View Request</button>
                                        {traderRequest && traderRequest.Selected ?
                                            <button className="btn btn-primary"
                                                disabled={!canAssign}
                                                data-toggle="modal"
                                                data-target={`#assign-from-request-dialog-${assignJobIndex}`}>Assign Job</button> :
                                            null}
                                    </section> :
                                    <button className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={`#send-trader-reqeust-dialog-${index}`}>Send Request</button>}
                            </div>
                        </div>
                    </div>
                </div>

                {traderRequest ? 
                    <TraderRequestDialog Index={index} TraderRequest={traderRequest} /> : 
                    null}

                {traderRequest && traderRequest.Selected ? 
                    <AssignJobDialog Index={assignJobIndex}
                        TraderRequestID={traderRequest.TraderRequestID}
                        Driver={driver}
                        Price={jobRequest.Price}
                        CanAssign={() => { return canAssign; }}
                        OnOK={this.props.OnJobAssigned} /> : 
                    null}

                <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#job-request-post-${index}`}>
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
                        <li role="presentation">
                            <a href={`#driver-${index}`} aria-controls={`driver-${index}`} role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshDriverContainer(); }}>Driver</a>
                        </li>
                        <li role="presentation">
                            <a href={`#truck-${index}`} aria-controls={`truck-${index}`} role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshTruckContainer(); }}>Truck</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={`job-request-${index}`}>
                            <JobRequestContainer JobRequest={jobRequest} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`driver-${index}`}>
                            <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={jobRequest.DriverID} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`truck-${index}`}>
                            <TruckContainer Refresh={refresh => { this.RefreshTruckContainer = refresh; }} DriverID={jobRequest.DriverID} />
                        </div>
                    </div>
                </div>
                <SendTraderRequestDialog
                    DialogID={index}
                    JobRequest={jobRequest}
                    IsRequestSent={() => { return traderRequest ? true : false; }}
                    OnOK={traderRequest => { this.props.OnRequestUpdated(jobRequest, traderRequest); }} />
            </li>
            {this.state.Preloader}
        </section>;     
    }
};

export default JobRequestPostListItem;