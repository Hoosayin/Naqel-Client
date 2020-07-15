import React, { Component } from "react";
import ProgressBar from "../../../../../../controls/ProgressBar";
import { getData } from "../../../../DriverFunctions";
import JobOfferPostListItem from "./JobOfferPostListItem";
import ProgressRing from "../../../../../../controls/ProgressRing";

class JobOfferPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobOfferPosts: [],
            Preloader: null,
            Searching: false,
            Refreshing: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.props.Refresh(this.refresh);
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "JobOfferPosts"
            };

            this.setState({
                Searching: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "JobOfferPosts"
            };

            this.setState({
                Refreshing: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Refreshing: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching) {
            return <section dir={GetDirection()}>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">{Dictionary.JobOffers}</div>
                                <p>{Dictionary.JobOffersSubtitle}</p>
                                <div class="type-sh3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                <ProgressBar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else if (this.state.JobOfferPosts.length === 0) {
            return <section dir={GetDirection()}>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">{Dictionary.JobOffers}</div>
                                <div className="type-sh3">{Dictionary.NoJobOffersFound}</div>
                                <p>{Dictionary.JobOffersSubtitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else {
            return <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>{Dictionary.JobOffers}
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
                </div>
                <ol className="list-items" style={{ marginTop: "0px" }}>
                    {this.state.JobOfferPosts.map((jobOfferPost, index) => {
                        return <JobOfferPostListItem
                            key={index}
                            Index={index}
                            JobOfferPost={jobOfferPost}
                            OnRequestUpdated={(jobOffer, driverRequest) => {
                                let jobOfferPosts = this.state.JobOfferPosts;

                                for (let jobOfferPost of jobOfferPosts) {
                                    if (jobOfferPost.JobOffer.JobOfferID === jobOffer.JobOfferID) {
                                        jobOfferPost.DriverRequest = driverRequest;
                                        break;
                                    }
                                }

                                this.setState({
                                    JobOfferPosts: jobOfferPosts
                                });
                            }} />;
                    })}
                </ol>
            </section>;
        }
       
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobOffers: "عروض العمل",
        JobOffersSubtitle: "يتم عرض فرص العمل من التجار والوسطاء هنا.",
        Searching: "يبحث",
        NoJobOffersFound: "لم يتم العثور على عروض عمل ...",
    };
}
else {
    Dictionary = {
        JobOffers: "Job Offers",
        JobOffersSubtitle: "Job opportunities from Traders and Brokers are displayed here.",
        Searching: "Searhcing",
        NoJobOffersFound: "No Job Offers Found...",
    };
}

export default JobOfferPostsList;