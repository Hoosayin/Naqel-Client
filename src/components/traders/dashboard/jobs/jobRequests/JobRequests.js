import React, { Component } from "react";

class JobOffers extends Component {
   render() {
        return (
            <section>
                <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Requests</div>
                                <div className="type-sh3">Under Construction</div>
                                <p>For now, it's lonely here! Drivers' Job Requests are displayed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default JobOffers;