import React, { Component } from "react";
import ProgressBar from "../../../../../controls/ProgressBar";
import { getData } from "../../../DriverFunctions";
import JobOfferPostListItem from "./JobOfferPostListItem";

class JobOfferPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobOfferPosts: [],
            Preloader: null,
            Searching: false,
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

    render() {
        if (this.state.Searching) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Offers</div>
                                <p>Job opportunities from Traders and Brokers are displayed here.</p>
                                <div class="type-sh3" style={{ color: "#008575" }}>Searhcing</div>
                                <ProgressBar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else if (this.state.JobOfferPosts.length === 0) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Offers</div>
                                <div className="type-sh3">No Job Offers Found...</div>
                                <p>Job opportunities from Traders and Brokers are displayed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else {
            return <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Job Offers</div>
                <ol className="list-items" style={{ marginTop: "0px" }}>
                    {this.state.JobOfferPosts.map((jobOfferPost, index) => {
                        return <JobOfferPostListItem
                            key={index}
                            Index={index}
                            JobOfferPost={jobOfferPost}
                            OnRequestUpdated={(jobOffer, requestSent) => {
                                let jobOfferPosts = this.state.JobOfferPosts;

                                for (let jobOfferPost of jobOfferPosts) {
                                    if (jobOfferPost.JobOffer.JobOfferID === jobOffer.JobOfferID) {
                                        jobOfferPost.RequestSent = requestSent;
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

export default JobOfferPostsList;