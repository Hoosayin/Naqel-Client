import React, { Component } from "react";
import CompletedJobContainer from "../../../../../containers/completedJob/CompletedJobContainer";
import Rating from "../../../../../controls/Rating";
import MoreDetails from "./moreDetails/MoreDetails";

class CompletedJobPackageListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const completedJob = this.props.CompletedJobPackage.CompletedJob;
        const billPaid = this.props.CompletedJobPackage.BillPaid;
        const driverReview = this.props.CompletedJobPackage.DriverReview;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            {billPaid ?
                <div class="alert alert-info m-n p-n" dir={GetDirection()}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-check-circle m-r-xxxs"></span>{Dictionary.BillPaid} <span className="color-default">{Dictionary.MoreDetails}</span>.</p>
                            </div>
                        </div>
                    </div>
                </div> :
                <div class="alert alert-danger m-n p-n" fir={GetDirection()}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>{Dictionary.BillNotPaid} <span className="color-default">{Dictionary.MoreDetails}</span></p>
                            </div>
                        </div>
                    </div>
                </div>}

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
                                        <div className="content-text-primary">{Dictionary.Rating}</div>
                                        <div className="content-text-secondary"><Rating Rating={driverReview.Rating} Color="" Size="rating-small" /></div>
                                        <div className="content-text-primary">{Dictionary.Review}</div>
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
                                        <div className="content-text-primary">{Dictionary.NoRatingFound}</div>
                                        <div className="content-text-secondary">{Dictionary.NoRatingFoundSubtitle}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#completed-job-${index}`} dir={GetDirection()}>
                <div className="type-h4 color-default text-right p-xxxs">{Dictionary.MoreDetails}
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`completed-job-${index}`}>
                <MoreDetails Index={index}
                    TraderID={completedJob.TraderID}
                    CompletedJobID={completedJob.CompletedJobID}
                    OnPayProofApproved={() => {
                        this.props.OnPayProofApproved(this.props.CompletedJobPackage);
                    }} />
            </div>
        </li>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        BillPaid: "تم دفع الفاتورة! للحصول على معلومات الدفع ، انقر على:",
        MoreDetails: "المزيد من التفاصيل",
        BillNotPaid: "لم يدفع التاجر الفاتورة بعد ؛ إذا تم دفع الفاتورة عن طريق التحويل المصرفي ، فإن موافقتك مطلوبة. للحصول على تفاصيل الدفع ، انقر على:",
        Rating: "تقييم",
        Review: "مراجعة",
        NoRatingFound: "لم يتم العثور على تصنيف",
        NoRatingFoundSubtitle: "يظهر تقييمك ومراجعتك هنا."
    };
}
else {
    Dictionary = {
        BillPaid: "The bill has been paid! For payment information, Tap on:",
        MoreDetails: "More Details",
        BillNotPaid: "The trader has not paid the bill yet; If the bill is paid via Bank Transfer then your approval is required. For payment details, tap on:",
        Rating: "Rating",
        Review: "Review",
        NoRatingFound: "No Rating Found",
        NoRatingFoundSubtitle: "Your rating and review appears here."
    };
}

export default CompletedJobPackageListItem;