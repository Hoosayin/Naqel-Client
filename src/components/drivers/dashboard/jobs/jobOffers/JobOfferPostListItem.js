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
                this.props.OnRequestUpdated(jobOffer, false);
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
                this.props.OnRequestUpdated(jobOffer, true);
            }

            this.setState({
                Preloader: null
            });
        });
    };

    render() {
        const index = this.props.Index;
        const jobOffer = this.props.JobOfferPost.JobOffer;
        const trader = this.props.JobOfferPost.Trader;
        const requestSent = this.props.JobOfferPost.RequestSent;

        let RequestButton;

        if (requestSent) {
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
                    disabled={requestSent}
                    data-target={`#bid-job-offer-dialog-${index}`}>Bid</button>;
        }

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron p-xxxs" style={{ backgroundColor: "#F2F2F2" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h5" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${index + 1}. Job Offer By ${trader.FirstName} ${trader.LastName}`}
                                    {requestSent ? <span class="badge back-color-default m-l-xxs">{(jobOffer.JobOfferType === "Fixed-Price") ?
                                        "REQUEST SENT" : "ALREADY BADE"}</span> : null}
                                </div>
                                <div className="type-sh6">
                                    <span className="fas fa-clock m-r-xxxs" style={{ color: "#606060" }}></span>{`Posted on ${new Date(jobOffer.TimeCreated).toDateString()}.`}
                                </div>
                                <div class="type-sh6">
                                    <span className="fas fa-map-marker-alt m-r-xxxs" style={{ color: "#606060" }}></span>{`From ${jobOffer.LoadingPlace} to ${jobOffer.UnloadingPlace} at $${jobOffer.Price}.`}
                                </div>
                                {RequestButton}
                            </div>
                        </div>
                    </div>
                </div>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#job-offer-post-${index}`}>
                    <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>
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
                    IsRequestSent={() => { return requestSent ? true : false; }}
                    OnOK={() => { this.props.OnRequestUpdated(jobOffer, true); }} />
            </li>
            {this.state.Preloader}
        </section>;
    }
};

export default JobOfferPostsList;