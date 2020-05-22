import React, { Component } from "react";
import TraderQuestionContainer from "../../../../../containers/traderQuestion/TraderQuestionContainer";
import AnswerTraderQuestionDialog from "./AnswerTraderQuestionDialog";
import ClassifyTraderQuestionDialog from "./ClassifyTraderQuestionDialog";

class TraderQuestionListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        return <section>
            <TraderQuestionContainer Index={Index}
                Question={Question} />

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#classify-trader-question-dialog-${Index}`}>Classify</button>

                <button className="btn btn-primary m-t-n"
                    data-toggle="modal"
                    data-target={`#answer-trader-question-dialog-${Index}`}>{Question.TraderAnswer ? "Update Answer" : "Answer"}</button>
            </div>

            <AnswerTraderQuestionDialog Index={Index}
                TraderQuestionID={Question.TraderQuestionID}
                QuestionNumber={Question.QuestionNumber}
                Answer={Question.TraderAnswer ? Question.TraderAnswer.Answer : ""}
                OnOK={this.props.OnQuestionUpdated} />

            <ClassifyTraderQuestionDialog Index={Index}
                TraderQuestionID={Question.TraderQuestionID}
                Class={Question.Class}
                OnOK={this.props.OnQuestionUpdated}/>
        </section>;
    }
};

export default TraderQuestionListItem;