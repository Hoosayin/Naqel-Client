import React, { Component } from "react";
import CompletedJobContainer from "../../../../../containers/completedJob/CompletedJobContainer";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import ReviewDialog from "./ReviewDialog";
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
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3 color-default p-t-n">Your Given Ratings</div>
                        </div>
                        <div className="row">
                            <div className="col-md-24">
                                <div className="entity-list theme-alt">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-star"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Rating</div>
                                            <div className="content-text-secondary"><Rating Rating={driverReview.Rating} Color="color-alt" Size="rating-small" /></div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-pencil-alt"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Review</div>
                                            <div className="content-text-secondary">{driverReview.Review}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3 color-default p-t-n">
                                <span className="fas fa-star m-r-xxs"></span>Rate and Review the Driver</div>
                            <div className="type-sh3">Your reviews means a lot to us and the driver too.</div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#review-dialog-${index}`}>Write a Review</button>
                        </div>
                    </div>
                </div>}

            <ReviewDialog DialogID={index}
                CompletedJobID={completedJob.CompletedJobID}
                OnOK={this.props.OnReviewAdded}/>

            <div data-toggle="collapse" aria-expanded="false" data-target={`#completed-job-${index}`}
                onClick={async () => { await this.RefreshDriverContainer(); }}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>Driver Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`completed-job-${index}`}>
                <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={completedJob.DriverID} />
            </div>
        </li>;
    }
};

export default CompletedJobPackageListItem;