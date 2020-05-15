import React, { Component } from "react";
import CompletedJobContainer from "../../../../../containers/completedJob/CompletedJobContainer";
import TraderContainer from "../../../../../containers/trader/TraderContainer";
import Rating from "../../../../../controls/Rating";

class CompletedJobPackageListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const completedJob = this.props.CompletedJobPackage.CompletedJob;
        const driverReview = this.props.CompletedJobPackage.DriverReview;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <CompletedJobContainer Index={index} CompletedJob={completedJob} />

            {driverReview ?
                <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                    <div class="row">
                        <div class="col-md-24">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Rating</div>
                                        <div className="content-text-secondary"><Rating Rating={driverReview.Rating} Color="" Size="rating-small" /></div>
                                        <div className="content-text-primary">Review</div>
                                        <div className="content-text-secondary">{driverReview.Review}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                    <div class="row">
                        <div class="col-md-24">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">No Rating Found</div>
                                        <div className="content-text-secondary">Your rating and review appears here.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            <div data-toggle="collapse" aria-expanded="false" data-target={`#completed-job-${index}`}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>Trader Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`completed-job-${index}`}>
                <TraderContainer TraderID={completedJob.TraderID} />
            </div>
        </li>;
    }
};

export default CompletedJobPackageListItem;