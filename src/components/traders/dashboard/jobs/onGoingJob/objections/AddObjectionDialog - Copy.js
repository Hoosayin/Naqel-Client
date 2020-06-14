import React, { Component } from "react";
import ReasonsList from "./ReasonsList";
import Preloader from "../../../../../../controls/Preloader";
import { addJobObjection } from "../../../../TraderFunctions";

class AddObjectionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Reason: "Select from the list.",
            Comment: "",

            ValidReason: false,
            ValidComment: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                Comment: "0"
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
        let ValidComment = this.state.ValidComment;

        switch (field) {
            case "Comment":
                ValidComment = (value !== "");
                Errors.Comment = ValidComment ? "" : "Comment is required";

                if (Errors.Comment !== "") {
                    break;
                }

                ValidComment = (value.length <= 200);
                Errors.Comment = ValidComment ? value.length : "Too long...";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidComment: ValidComment
        }, () => {
            this.setState({
                ValidForm: this.state.ValidReason && this.state.ValidComment
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            Preloader: <Preloader />
        });

        const newJobObjection = {
            Token: localStorage.Token,
            OnGoingJobID: this.props.OnGoingJobID,
            Reason: this.state.Reason,
            Comment: this.state.Comment
        };

        console.log("Going to add job objection...");

        await addJobObjection(newJobObjection).then(response => {
            if (response.Message === "Job objection is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-objection-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary"
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Add an Objection</div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label>Reason</label>
                                    <input type="text" class="form-control" name="Reason" style={{ maxWidth: "100%" }} readonly
                                        value={this.state.Reason} />
                                </div>
                                <div class="form-group">
                                    <label>Comment</label>
                                    <textarea rows="4" class="form-control" style={{ maxWidth: "100%" }} name="Comment"
                                        value={this.state.Comment} onChange={this.onChange}></textarea>
                                    <span className="text-danger">{this.state.Errors.Comment}</span>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <input type="submit" value="Add Objection" className="btn btn-primary" style={{ margin: "0px" }} disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                            <br/>
                            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                            <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>{"   Reasons"}
                                <i className="fas fa-ellipsis-v"></i>
                            </div>
                            <ReasonsList ObjectionReasons={this.props.ObjectionReasons} OnReasonSelected={reason => {
                                this.setState({
                                    Reason: reason,
                                    ValidReason: true
                                }, () => {
                                    this.setState({
                                        ValidForm: this.state.ValidReason && this.state.ValidComment
                                    });
                                });
                            }} />                           
                        </div>
                    </div>
                </div>
            </div>
        </section>

            <section>
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
                                                    <div className="type-h3 color-default p-t-n">Rate and Review</div>
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
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <input type="submit" value="Submit" className="btn btn-primary m-n" disabled={!this.state.ValidForm} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ;
    }
};

export default AddObjectionDialog;