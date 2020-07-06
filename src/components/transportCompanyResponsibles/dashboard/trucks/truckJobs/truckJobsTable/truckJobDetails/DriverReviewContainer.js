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
                <div className="type-h4 color-default p-t-xxxs">{Dictionary.DriversReview}</div>

                <div class="row">
                    <div class="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-star"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.Rating}</div>
                                    <div className="content-text-secondary"><Rating Rating={DriverReview.Rating} Color="" Size="rating-small" /></div>
                                    <div className="content-text-primary">{Dictionary.Review}</div>
                                    <div className="content-text-secondary">{DriverReview.Review}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div > :
            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                <div className="type-h4 color-default p-t-xxxs">{Dictionary.DriversReview}</div>

                <div class="row">
                    <div class="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-star"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.NoRatingFound}</div>
                                    <div className="content-text-secondary">{Dictionary.NoRatingFoundDetails}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;

    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        DriversReview: "مراجعة السائق",
        Rating: "تقييم",
        Review: "مراجعة",
        NoRatingFound: "لم يتم العثور على تصنيف",
        NoRatingFoundDetails: ".يظهر تقييم ومراجعة السائق هنا",
    };
}
else {
    Dictionary = {
        DriversReview: "Driver's Review",
        Rating: "Rating",
        Review: "Review",
        NoRatingFound: "No Rating Found",
        NoRatingFoundDetails: "Driver's rating and review appears here.",
    };
}


export default DriverReviewContainer;