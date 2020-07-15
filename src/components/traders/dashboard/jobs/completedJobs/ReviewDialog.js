import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import InteractiveRating from "../../../../../controls/InteractiveRating";
import { addDriverReview } from "../../../TraderFunctions";

class ReviewDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Rating: 0,
            Review: "",

            ValidRating: false,
            ValidReview: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Review: "0"
            }
        };

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidReview = this.state.ValidReview;

        switch (field) {
            case "Review":
                ValidReview = (value !== "");
                Errors.Review = ValidReview ? "" : Dictionary.ReviewError1;

                if (Errors.Review !== "") {
                    break;
                }

                ValidReview = (value.length <= 200);
                Errors.Review = ValidReview ? value.length : Dictionary.ReviewError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidReview: ValidReview
        }, () => {
            this.setState({
                ValidForm: this.state.ValidRating && this.state.ValidReview
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newDriverReview = {
            Token: sessionStorage.Token,
            CompletedJobID: this.props.CompletedJobID,
            Rating: this.state.Rating,
            Review: this.state.Review
        };

        console.log("Going to add driver review...");

        await addDriverReview(newDriverReview).then(response => {
            if (response.Message === "Driver review is added.") {
                this.setState({
                    ShowPreloader: false
                });

                this.cancelButton.click();
                this.props.OnOK(response.DriverReview);
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id={`review-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">{Dictionary.RateAndReview}</div>
                                                <div class="form-group">
                                                    <label>{Dictionary.RateDriver}</label>
                                                    <InteractiveRating OnRated={rating => {
                                                        this.setState({
                                                            Rating: rating,
                                                            ValidRating: true
                                                        }, () => {
                                                            this.setState({
                                                                ValidForm: this.state.ValidRating && this.state.ValidReview
                                                            });
                                                        });
                                                    }} />
                                                </div>
                                                <div class="form-group">
                                                    <label>{Dictionary.Review}</label>
                                                    <textarea rows="6" class="form-control" name="Review" style={{ maxWidth: "100%" }}
                                                        value={this.state.Review} onChange={this.onChange}></textarea>
                                                    <span className={(this.state.Errors.Review === Dictionary.ReviewError1 ||
                                                        this.state.Errors.Review === Dictionary.ReviewError2) ? "text-danger" : "text-accent"}>{this.state.Errors.Review}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Submit} className="btn btn-primary m-n" disabled={!this.state.ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        RateAndReview: "تقييم ومراجعة",
        RateDriver: "قيم هذا السائق",
        Review: "مراجعة",
        Submit: "إرسال",
        ReviewError1: "المراجعة مطلوبة",
        ReviewError2: "...طويل جدا",
    };
}
else {
    Dictionary = {
        RateAndReview: "Rate and Review",
        RateDriver: "Rate this Driver",
        Review: "Review",
        Submit: "Submit",
        ReviewError1: "Review is required",
        ReviewError2: "Too long...",
    };
}

export default ReviewDialog;