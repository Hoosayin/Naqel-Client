import React, { Component } from "react";
import Rating from "../../../../../../../controls/Rating";

class DriverReviewContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            DriverReview
        } = this.props;

        return DriverReview ?
            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                <div className="type-h4 color-default p-t-xxxs">Driver's Review</div>

                <div class="row">
                    <div class="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-star"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Rating</div>
                                    <div className="content-text-secondary"><Rating Rating={DriverReview.Rating} Color="" Size="rating-small" /></div>
                                    <div className="content-text-primary">Review</div>
                                    <div className="content-text-secondary">{DriverReview.Review}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div > :
            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                <div className="type-h4 color-default p-t-xxxs">Driver's Review</div>

                <div class="row">
                    <div class="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-star"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">No Rating Found</div>
                                    <div className="content-text-secondary">Driver's rating and review appears here.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;

    }
};

export default DriverReviewContainer;