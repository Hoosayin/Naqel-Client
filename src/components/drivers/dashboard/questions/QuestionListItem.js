import React, { Component } from "react";
import DriverQuestionContainer from "../../../../containers/driverQuestion/DriverQuestionContainer";
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
            <DriverQuestionContainer Index={Index}
                Question={Question} />

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-danger m-t-n"
                    data-toggle="modal"
                    data-target={`#delete-driver-question-dialog-${Index}`}>{Dictionary.Delete}</button>
            </div>

            <DeleteQuestionDialog Index={Index}
                DriverQuestionID={Question.DriverQuestionID}
                QuestionNumber={Question.QuestionNumber}
                OnOK={this.props.OnQuestionDeleted} />
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Delete: "حذف"
    };
}
else {
    Dictionary = {
        Delete: "Delete"
    };
}

export default QuestionListItem;