import React, { Component } from "react";

class OnGoingJobs extends Component {
   render() {
        return (
            <section>
                <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="on_going_jobs.png" src="./images/on_going_jobs.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">On-Going Jobs</div>
                                <div className="type-sh3">Under Construction</div>
                                <p>For now, it's lonely here!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default OnGoingJobs;