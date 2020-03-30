import React, { Component } from "react";
import AddJobOfferDialog from "./AddJobOfferDialog.js";
import JobOffersList from "./JobOffersList.js";

class JobOffers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddJobOfferDialog: null,
            JobOffersList: null
        };

        this.onJobOffersUpdated = this.onJobOffersUpdated.bind(this);
    }

    componentDidMount() {
        this.onJobOffersUpdated();
    }

    onJobOffersUpdated = () => {
        this.JobOffersList.onComponentUpdated();
    }

    render() {
        return (
            <section>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_offers.png" src="./images/job_offers.png" data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Job Offers</div>
                                <div class="type-sh3">Manage Your Job Offers</div>
                                <p>Hi There! Want to transport your freight somewhere? Why not create a new job offer now!!</p>
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#add-job-offer-dialog"
                                        onMouseDown={() => {
                                            this.setState({
                                                AddJobOfferDialog: (<AddJobOfferDialog
                                                    OnCancel={() => {
                                                        this.setState({
                                                            AddJobOfferDialog: null,
                                                        });
                                                    }}
                                                    OnOK={cancelButton => {
                                                        cancelButton.click();
                                                        this.onJobOffersUpdated();
                                                    }} />),
                                            });
                                        }}>
                                        New Job Offer
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <JobOffersList ref={jobOffersList => this.JobOffersList = jobOffersList} />
                {this.state.AddJobOfferDialog}             
            </section>
        );
    }
};

export default JobOffers;