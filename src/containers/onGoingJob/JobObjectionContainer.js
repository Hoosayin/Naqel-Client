import React, { Component } from "react";

class JobObjectionContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            JobObjection
        } = this.props;

        let createdOn = new Date(JobObjection.Created);
        let objectionBy = JobObjection.ObjectionBy;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="type-h5 color-default p-t-n">{`${Index + 1}.`}</div>
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-user"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">
                                    {objectionBy.Type === "Driver" ? 
                                        <span className="fas fa-car m-r-xxxs"></span> : 
                                        <span className="fas fa-briefcase m-r-xxxs"></span>}
                                    {`${objectionBy.FirstName} ${objectionBy.LastName}`}
                                </div>
                                <div className="content-text-secondary">{objectionBy.Username}</div>
                                <div className="content-text-secondary">{`Posted on ${createdOn.toDateString()}.`}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-thumbs-down"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Objection</div>
                                <div className="content-text-secondary">{`Reason: ${JobObjection.Reason}`}</div>
                                <div className="content-text-secondary">{`Comment: ${JobObjection.Comment}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </section>;
    }
};

export default JobObjectionContainer;