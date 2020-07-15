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
        const billPaid = this.props.CompletedJobPackage.BillPaid;
        const driverReview = this.props.CompletedJobPackage.DriverReview;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            {!billPaid ?
                <div class="alert alert-danger m-n p-n" dir={GetDirection()}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs m-l-xxxs"></span>{Dictionary.BillNotPaidMessage}.</p>
                            </div>
                        </div>
                    </div>
                </div> :
                <div class="alert alert-info m-n p-n" dir={GetDirection()}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-check-circle m-r-xxxs m-l-xxxs"></span>{Dictionary.BillPaidMessage}.</p>
                            </div>
                        </div>
                    </div>
                </div>}

            <CompletedJobContainer Index={index} CompletedJob={completedJob} />

            {driverReview ?
                <div class="alert alert-info m-n p-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
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
                <div class="alert alert-info m-n p-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                    <div class="row">
                        <div class="col-md-20">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.RateAndReview}</div>
                                        <div className="content-text-secondary">{Dictionary.RateAndReviewSubtitle}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-right">
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#review-dialog-${index}`}>{Dictionary.WriteAReview}</button>
                        </div>
                    </div>
                </div>}

            <ReviewDialog DialogID={index}
                CompletedJobID={completedJob.CompletedJobID}
                OnOK={this.props.OnReviewAdded}/>

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#completed-job-${index}`}
                onClick={async () => { await this.RefreshDriverContainer(); }}>
                <div className="type-h4 color-default text-right p-xxxs">{Dictionary.DriverDetails}
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        BillNotPaidMessage: "يرجى دفع فاتورة هذه الوظيفة من قسم المدفوعات. إذا قمت بتحميل إثبات دفع ، فيرجى الانتظار حتى يوافق السائق على الدفع",
        BillPaidMessage: "تم دفع الفاتورة! عرض تفاصيل الفاتورة من قسم المدفوعات",
        Rating: "تقييم",
        Review: "مراجعة",
        RateAndReview: "تقييم ومراجعة برنامج التشغيل",
        RateAndReviewSubtitle: ".ملاحظاتك تعني الكثير لنا وللسائق أيضًا",
        WriteAReview: "أكتب مراجعة",
        DriverDetails: "تفاصيل السائق",
    };
}
else {
    Dictionary = {
        BillNotPaidMessage: "Please pay the bill for this job from Payments section. If you have uploaded a payment proof, then please wait for the driver to approve your payment",
        BillPaidMessage: "The bill has been paid! View bill details from the Payments section",
        Rating: "Rating",
        Review: "Review",
        RateAndReview: "Rate and Review the Driver",
        RateAndReviewSubtitle: "Your reviews means a lot to us and the driver too.",
        WriteAReview: "Write a Review",
        DriverDetails: "Driver Details",
    };
}

export default CompletedJobPackageListItem;