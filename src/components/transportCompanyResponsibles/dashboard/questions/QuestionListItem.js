import React, { Component } from "react";
import ResponsibleQuestionContainer from "../../../../containers/responsibleQuestion/ResponsibleQuestionContainer";
import DeleteQuestionDialog from "./DeleteQuestionDialog";

class QuestionListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        return <section>
            <ResponsibleQuestionContainer Index={Index}
                Question={Question} />

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-danger m-t-n"
                    data-toggle="modal"
                    data-target={`#delete-responsible-question-dialog-${Index}`}>Delete</button>
            </div>

            <DeleteQuestionDialog Index={Index}
                ResponsibleQuestionID={Question.ResponsibleQuestionID}
                QuestionNumber={Question.QuestionNumber}
                OnOK={this.props.OnQuestionDeleted}/>
        </section>;
    }
};

export default QuestionListItem;