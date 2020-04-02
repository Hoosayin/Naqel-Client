import React, { Component } from "react";

class JobOffers extends Component {
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
                                <div class="type-sh3">Under Construction</div>
                                <p>For now, it's lonely here!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default JobOffers;