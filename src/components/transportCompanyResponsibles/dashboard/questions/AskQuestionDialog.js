import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { addQuestion } from "../../TransportCompanyResponsiblesFunctions";

class AskQuestionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Question: "",

            ValidQuestion: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Question: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidQuestion = this.state.ValidQuestion;

        switch (field) {
            case "Question":
                ValidQuestion = (value !== "");
                Errors.Question = ValidQuestion ? "" : "Question is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidQuestion: ValidQuestion,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidQuestion
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

        const newQuestion = {
            Token: localStorage.Token,
            Question: this.state.Question
        };

        await addQuestion(newQuestion).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Question is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        const {
            Question,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`ask-question-dialog`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
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
                                                <div className="type-h3 color-default p-t-n">Ask a New Question</div>
                                                <div class="form-group">
                                                    <label className="control-label">Question</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <textarea rows="6" class="form-control" name="Question" style={{ maxWidth: "100%" }}
                                                        value={Question} onChange={this.onChange}></textarea>
                                                    <span className="text-danger">{Errors.Question}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Post" className="btn btn-primary" disabled={!ValidForm} />
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

export default AskQuestionDialog;