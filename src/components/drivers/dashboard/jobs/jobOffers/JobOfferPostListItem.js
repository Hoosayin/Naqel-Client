import React, { Component } from "react";
import { addDriverRequest, deleteDriverRequest } from "../../../DriverFunctions";
import TraderContainer from "../../../../../containers/trader/TraderContainer";
import JobOfferContainer from "../../../../../containers/jobOffer/JobOfferContainer";
import BidJobOfferDialog from "./BidJobOfferDialog";
import Preloader from "../../../../../controls/Preloader";

class JobOfferPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onSendRequest = this.onSendRequest.bind(this);
        this.onCancelRequest = this.onCancelRequest.bind(this);
    }

    onCancelRequest = async jobOffer => {
        const discardedDriverRequest = {
            Token: localStorage.Token,
            JobOfferID: jobOffer.JobOfferID
        };

        console.log("Going to delete driver request...");

        this.setState({
            Preloader: <Preloader />
        });

        await deleteDriverRequest(discardedDriverRequest).then(response => {
            if (response.Message === "Driver request is deleted.") {
                this.props.OnRequestUpdated(jobOffer, null);
            }

            this.setState({
                Preloader: null
            });
        });
    };

    onSendRequest = async jobOffer => {
        if (this.props.JobOfferPost.RequestSent) {
            return;
        }

        const newDriverRequest = {
            Token: localStorage.Token,
            JobOfferID: jobOffer.JobOfferID,
            Price: null
        };

        console.log("Going to add driver request...");

        this.setState({
            Preloader: <Preloader />
        });

        await addDriverRequest(newDriverRequest).then(response => {
            if (response.Message === "Driver request is added.") {
                this.setState({
                    Preloader: null
                });

                this.props.OnRequestUpdated(jobOffer, response.DriverRequest);
            }
            else {
                this.setState({
                    Preloader: null
                });
            }
        });
    };

    render() {
        const index = this.props.Index;
        const jobOffer = this.props.JobOfferPost.JobOffer;
        const trader = this.props.JobOfferPost.Trader;
        const driverRequest = this.props.JobOfferPost.DriverRequest;

        let RequestButton;

        if (driverRequest) {
            RequestButton = <button className="btn btn-secondary"
                onClick={async () => { 
                    await this.onCancelRequest(jobOffer); }}>{(jobOffer.JobOfferType === "Fixed-Price") ?
                    "Cancel Request" :
                    "Cancel Bid"}
            </button>;
        }
        else {
            RequestButton = (jobOffer.JobOfferType === "Fixed-Price") ?
                <button className="btn btn-primary"
                    onClick={async () => { await this.onSendRequest(jobOffer); }}>Send Request</button> :
                <button className="btn btn-primary"
                    data-toggle="modal"
                    disabled={driverRequest}
                    data-target={`#bid-job-offer-dialog-${index}`}>Bid</button>;
        }

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron p-xxxs back-color-gray">
                    <div className="container">
                        <div className="row">
                            <div className="type-h5 color-default p-t-n">
                                {`${index + 1}.`}
                                {driverRequest ? <span class="badge back-color-default m-l-xxs">{(jobOffer.JobOfferType === "Fixed-Price") ?
                                    "REQUEST SENT" : "ALREADY BADE"}</span> : null}
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-user"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Posted By</div>
                                            <div className="content-text-secondary">{`${trader.FirstName} ${trader.LastName}`}
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
                                            <div className="content-text-secondary">{new Date(jobOffer.TimeCreated).toDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                                {driverRequest && driverRequest.Price ?
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-tag"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Your Bid Price</div>
                                                <div className="content-text-secondary">{`$${driverRequest.Price}`}</div>
                                            </div>
                                        </div>
                                    </div> : 
                                    null}
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-tag"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Price</div>
                                            <div className="content-text-secondary">{`$${jobOffer.Price}`}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas  fa-map-marker-alt"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">From </div>
                                            <div className="content-text-secondary">{jobOffer.LoadingPlace}</div>
                                            <div className="content-text-primary">To</div>
                                            <div className="content-text-secondary">{jobOffer.UnloadingPlace}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                {RequestButton}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#job-offer-post-${index}`}>
                    <div className="type-h4 text-right color-default p-xxxs">
                        {"   More Details"} <i className="fas fa-ellipsis-v"></i>
                        <i class="glyph glyph-add"></i>
                        <i class="glyph glyph-remove"></i>
                    </div>
                </div>
                <div className="collapse" id={`job-offer-post-${index}`}>
                    <ul className="nav nav-tabs" role="tablist"
                        style={{
                            padding: "10px",
                            backgroundColor: "#EFEFEF",
                            width: "100%",
                            margin: "0px"
                        }}>
                        <li role="presentation" className="active">
                            <a href={`#job-offer-${index}`} aria-controls={`job-offer-${index}`} role="tab" data-toggle="tab">Job Offer</a>
                        </li>
                        <li role="presentation">
                            <a href={`#trader-${index}`} aria-controls={`trader-${index}`} role="tab" data-toggle="tab">Trader</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={`job-offer-${index}`}>
                            <JobOfferContainer JobOffer={jobOffer} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`trader-${index}`}>
                            <TraderContainer TraderID={jobOffer.TraderID} />
                        </div>
                    </div>
                </div>
                <BidJobOfferDialog
                    DialogID={index}
                    JobOffer={jobOffer}
                    IsRequestSent={() => { return driverRequest ? true : false; }}
                    OnOK={driverRequest => { this.props.OnRequestUpdated(jobOffer, driverRequest); }} />
            </li>
            {this.state.Preloader}
        </section>;
    }
};

export default JobOfferPostsList;