import React, { Component } from "react";
import { addDriverRequest } from "../../../DriverFunctions";
import TraderTab from "./TraderTab";
import JobOfferTab from "./JobOfferTab";
import BidJobOfferDialog from "./BidJobOfferDialog";
import Preloader from "../../../../../controls/Preloader";

class JobOfferPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onSendRequest = this.onSendRequest.bind(this);
    }

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
                this.props.OnRequestSent(jobOffer);
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
        const profilePhoto = this.props.JobOfferPost.ProfilePhoto;
        const requestSent = this.props.JobOfferPost.RequestSent;

        const documents = {
            IdentityCard: this.props.JobOfferPost.IdentityCard,
            CommercialRegisterCertificate: this.props.JobOfferPost.CommercialRegisterCertificate
        };

        return <section>
            <li className="list-items-row" style={{ borderTop: "2px solid #EAEAEA" }}>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#job-offer-post-${index}`}>
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <img src={profilePhoto ? profilePhoto : "./images/defaultProfilePhoto.png"} alt="defaultProfilePhoto.png" />
                            </div>
                            <div className="item-content-secondary">
                                <div className="content-text-primary">{jobOffer.LoadingPlace}
                                </div>
                                <div className="content-text-secondary">{jobOffer.UnloadingPlace}
                                </div>
                            </div>
                            <div className="item-content-primary">
                                {requestSent ?
                                    <div className="content-text-primary">{trader.FirstName} {trader.LastName}
                                        <span className="fas fa-paper-plane" style={{ color: "#008575", fontSize: "x-small" }}></span>
                                        <span style={{ color: "#008575", fontSize: "x-small" }}>{(jobOffer.JobOfferType === "Fixed-Price") ?
                                            "REQUEST SENT" : "ALREADY BADE"}</span>
                                    </div> :
                                    <div className="content-text-primary">{trader.FirstName} {trader.LastName}</div>}
                                <div className="content-text-secondary">
                                    <div>
                                        <span className="fas fa-globe-asia" style={{ color: "#707070" }}></span> . {new Date(jobOffer.TimeCreated).toDateString()}
                                    </div>                                   
                                </div>
                            </div>
                        </div>
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
                            <a href={`#trader-${index}`} aria-controls={`trader-${index}`} role="tab" data-toggle="tab">{trader.Type}</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={`job-offer-${index}`}>
                            <JobOfferTab JobOffer={jobOffer} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`trader-${index}`}>
                            <TraderTab Trader={trader} ProfilePhoto={profilePhoto}
                                Documents={documents} />
                        </div>
                        <div style={{ backgroundColor: "#EFEFEF", textAlign: "right", padding: "10px" }}>
                            {(jobOffer.JobOfferType === "Fixed-Price") ?
                                <button className="btn btn-primary"
                                    disabled={requestSent}
                                    onClick={async () => { await this.onSendRequest(jobOffer); }}>
                                    {requestSent ? "Request Sent" : "Send Request"}
                                </button> :
                                <button className="btn btn-primary"
                                    data-toggle="modal"
                                    disabled={requestSent}
                                    data-target={`#bid-job-offer-dialog-${index}`}>
                                    {requestSent ? "Already Bade" : "Bid"}
                                </button>}
                        </div>
                    </div>
                </div>
                <BidJobOfferDialog
                    DialogID={index}
                    JobOffer={jobOffer}
                    IsRequestSent={() => { return requestSent ? true : false; }}
                    OnOK={() => { this.props.OnRequestSent(jobOffer); }} />
            </li>
            {this.state.Preloader}
        </section>;
    }
};

export default JobOfferPostsList;