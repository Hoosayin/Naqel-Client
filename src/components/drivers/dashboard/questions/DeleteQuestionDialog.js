import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { deleteQuestion } from "../../DriverFunctions";

class DeleteQuestionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowPreloader: true
        });

        const discardedQuestion = {
            Token: sessionStorage.Token,
            DriverQuestionID: this.props.DriverQuestionID
        };

        await deleteQuestion(discardedQuestion).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Question is deleted.") {
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
            QuestionNumber
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`delete-driver-question-dialog-${Index}`}
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
                            <div className="jumbotron theme-default" dir={GetDirection()}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">{Dictionary.DeleteQuestion}</div>
                                            <div className="type-sh3 m-b-xxs">{Dictionary.DeleteMessage}
                                                <span className="color-default">{` ${QuestionNumber}.`}</span></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={this.onDelete}>{Dictionary.Delete}</button>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        DeleteQuestion: "حذف السؤال",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف السؤال برقم التعريف",
        Delete: "حذف"
    };
}
else {
    Dictionary = {
        DeleteQuestion: "Delete Question",
        DeleteMessage: "Are you sure you want to delete question with ID",
        Delete: "Delete"
    };
}

export default DeleteQuestionDialog;