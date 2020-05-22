import React, { Component } from "react";

class DriverQuestionContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        const askedOn = new Date(Question.Created);
        const askedBy = Question.AskedBy;
        const driverAnswer = Question.DriverAnswer;
        const answeredOn = driverAnswer ? new Date(driverAnswer.Created) : null;
        const answeredBy = driverAnswer ? driverAnswer.AnsweredBy : null;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="type-h5 color-default p-t-n">{`${Index + 1}. Question ID: ${Question.QuestionNumber}`}</div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-user"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">
                                            <span className="fas fa-car m-r-xxxs"></span>
                                            {`${askedBy.FirstName} ${askedBy.LastName}`}
                                        </div>
                                        <div className="content-text-secondary">{askedBy.Username}</div>
                                        <div className="content-text-secondary">{`${askedOn.toDateString()} at ${askedOn.toLocaleTimeString()}`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-question"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">
                                            <span className="m-r-xxxs">Question</span>
                                            {Question.Class ?
                                                <span class="badge back-color-golden">{Question.Class.toUpperCase()}</span> :
                                                <span class="badge back-color-golden">UNCLASSIFIED</span>}
                                        </div>
                                        <div className="content-text-secondary">{Question.Question}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {driverAnswer ? 
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-user"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="fas fa-user-shield m-r-xxxs"></span>
                                                {`${answeredBy.FirstName} ${answeredBy.LastName}`}
                                            </div>
                                            <div className="content-text-secondary">{answeredBy.Username}</div>
                                            <div className="content-text-secondary">{`${answeredOn.toDateString()} at ${answeredOn.toLocaleTimeString()}.`}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-comment"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="m-r-xxxs">Answer</span>
                                                {driverAnswer.Edited ? <span className="color-default">EDITED</span> : null}
                                            </div>
                                            <div className="content-text-secondary">{driverAnswer.Answer}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> : 
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-comment"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="m-r-xxxs">Answer</span>
                                            </div>
                                            <div className="content-text-secondary">This question has not been answered yet.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
       </section>;
    }
};

export default DriverQuestionContainer;