import React, { Component } from "react";

class JobObjectionContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const jobObjectionPackage = this.props.JobObjectionPackage;
        const jobObjection = jobObjectionPackage.JobObjection;
        const firstName = jobObjectionPackage.FirstName;
        const lastName = jobObjectionPackage.LastName;

        let createdOn = new Date(jobObjection.Created);

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                {`${index + 1}. Objection By ${firstName} ${lastName}`}
                            </div>
                            <div className="type-sh3">
                                <span className="fas fa-clock" style={{ color: "#606060" }}></span>   {`Posted on ${createdOn.toDateString()}.`}
                            </div>
                            <div className="row">
                                <div className="col-md-24">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-exclamation"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Reason</div>
                                                <div className="content-text-secondary">{jobObjection.Reason}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-comment"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Comment</div>
                                                <div className="content-text-secondary">{jobObjection.Comment}</div>
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

export default JobObjectionContainer;