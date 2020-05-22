import React, { Component } from "react";
import DriverQuestionContainer from "../../../../../containers/driverQuestion/DriverQuestionContainer";
import AnswerDriverQuestionDialog from "./AnswerDriverQuestionDialog";
import ClassifyDriberQuestionDialog from "./ClassifyDriverQuestionDialog";

class DriverQuestionListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        return <section>
            <DriverQuestionContainer Index={Index}
                Question={Question} />

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#classify-driver-question-dialog-${Index}`}>Classify</button>

                <button className="btn btn-primary m-t-n"
                    data-toggle="modal"
                    data-target={`#answer-driver-question-dialog-${Index}`}>{Question.DriverAnswer ? "Update Answer" : "Answer"}</button>
            </div>

            <AnswerDriverQuestionDialog Index={Index}
                DriverQuestionID={Question.DriverQuestionID}
                QuestionNumber={Question.QuestionNumber}
                Answer={Question.DriverAnswer ? Question.DriverAnswer.Answer : ""}
                OnOK={this.props.OnQuestionUpdated} />

            <ClassifyDriberQuestionDialog Index={Index}
                DriverQuestionID={Question.DriverQuestionID}
                Class={Question.Class}
                OnOK={this.props.OnQuestionUpdated}/>
        </section>;
    }
};

export default DriverQuestionListItem;