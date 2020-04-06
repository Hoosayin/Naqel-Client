import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { getData } from "../../../DriverFunctions";
import TraderTab from "./TraderTab";
import JobOfferTab from "./JobOfferTab";

class JobOffersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobOfferPosts: [],
            Preloader: null
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPosts"
            };

            this.setState({
                Preloader: <Preloader />
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Preloader: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.JobOfferPosts.length === 0) {
            return <section>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.png" data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Job Offers</div>
                                <div class="type-sh3">No Job Offers Found...</div>
                                <p>Job opportunities from Traders and Brokers are displayed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.Preloader}
            </section>;
        }
        else {
            return <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Job Offers</div>
                <ol className="list-items">
                    {this.state.JobOfferPosts.map((jobOfferPost, index) => {
                        const jobOffer = jobOfferPost.JobOffer;
                        const trader = jobOfferPost.Trader;
                        const profilePhoto = jobOfferPost.ProfilePhoto;
                        const identityCard = jobOfferPost.IdentityCard;
                        const commercialRegisterCertificate = jobOfferPost.CommercialRegisterCertificate;

                        return <li key={index} class="list-items-row" style={{ borderTop: "2px solid #EAEAEA" }}>
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#list-item-line-${index}`}>
                                <div class="entity-list">
                                    <div class="entity-list-item">
                                        <div class="item-icon">
                                            <img src={profilePhoto ? profilePhoto.PhotoURL : "./images/defaultProfilePhoto.png"} alt="defaultProfilePhoto.png" />
                                        </div>
                                        <div class="item-content-secondary">
                                            <div class="content-text-primary">{jobOffer.LoadingPlace}
                                            </div>
                                            <div class="content-text-secondary">{jobOffer.UnloadingPlace}
                                            </div>
                                        </div>
                                        <div class="item-content-primary">
                                            <div class="content-text-primary">{trader.FirstName} {trader.LastName}</div>
                                            <div class="content-text-secondary">
                                                <span className="fas fa-calendar" style={{ color: "#707070" }}></span>
                                                {new Date(jobOffer.TimeCreated).toDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse" id={`list-item-line-${index}`}>
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
                                            Documents={{
                                                IdentityCard: identityCard,
                                                CommercialRegisterCertificate: commercialRegisterCertificate
                                            }} />
                                    </div>
                                </div>
                                {(jobOffer.JobOfferType === "Fixed-Price") ? <div class="row" style={{ backgroundColor: "#EFEFEF" }}>
                                    <div class="col-md-18 col-md-offset-2"></div>
                                    <div class="col-md-4 text-right">
                                        <button class="btn btn-primary">Accept</button>
                                    </div>
                                </div> : <div class="row" style={{ backgroundColor: "#EFEFEF" }}>
                                        <div class="col-md-18 col-md-offset-2"></div>
                                        <div class="col-md-4 text-right">
                                            <button class="btn btn-primary">Bid</button>
                                        </div>
                                    </div>}
                            </div>
                        </li>;
                    })}
                </ol>
                {this.state.Preloader}
            </section>;
        }
       
    }
};

export default JobOffersList;