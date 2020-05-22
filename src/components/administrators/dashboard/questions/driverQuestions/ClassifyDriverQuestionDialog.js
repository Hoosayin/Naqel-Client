import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import DriverQuestionClasses from "./DriverQuestionClasses";
import { classifyDriverQuestion } from "../../../AdministratorFunctions";

class ClassifyDriverQuestionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onClassSelected = this.onClassSelected.bind(this);
    }

    onClassSelected = async questionClass => {
        this.setState({
            ShowPreloader: true
        });

        const classifiedDriverQuestion = {
            Token: localStorage.Token,
            DriverQuestionID: this.props.DriverQuestionID,
            Class: questionClass
        };

        await classifyDriverQuestion(classifiedDriverQuestion).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Question is classified.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            Class,
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`classify-driver-question-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
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
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">Classify the Question</div>
                                            <div className="type-h7 p-t-xxxs">{Class ? `Current Class: ${Class}` : `Current Class: Unclassified`}</div>
                                            <div className="m-t-xxxs">
                                                <DriverQuestionClasses OnClassSelected={this.onClassSelected} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default ClassifyDriverQuestionDialog;