import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import InteractiveRating from "../../../../../controls/InteractiveRating";
import { addDriverReviewFromOnGoingJob } from "../../../TraderFunctions";

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
                Errors.Review = ValidReview ? "" : "Review is required";

                if (Errors.Review !== "") {
                    break;
                }

                ValidReview = (value.length <= 200);
                Errors.Review = ValidReview ? value.length : "Too long...";
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
            Token: localStorage.Token,
            OnGoingJobID: this.props.OnGoingJobID,
            Rating: this.state.Rating,
            Review: this.state.Review
        };

        console.log("Going to add driver review...");

        await addDriverReviewFromOnGoingJob(newDriverReview).then(response => {
            if (response.Message === "Driver review is added.") {
                this.setState({
                    ShowPreloader: false
                });

                this.cancelButton.click();
                this.props.OnOK();
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
            <div className="modal modal-center-vertical" id="review-dialog-from-on-going-job"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary"
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h3 color-default p-t-n">Rate and Review</div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label>Rate this Driver</label>
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
                                    <label>Review</label>
                                    <textarea rows="6" class="form-control" name="Review" style={{ maxWidth: "100%" }}
                                        value={this.state.Review} onChange={this.onChange}></textarea>
                                    <span className={(this.state.Errors.Review === "Too long..." ||
                                        this.state.Errors.Review === "Review is required") ? "text-danger" : "text-accent"}>{this.state.Errors.Review}</span>
                                </div>
                                <div className="text-right">
                                    <input type="submit" value="Submit" className="btn btn-primary m-n" disabled={!this.state.ValidForm} />
                                </div>
                            </form>                        
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default ReviewDialog;