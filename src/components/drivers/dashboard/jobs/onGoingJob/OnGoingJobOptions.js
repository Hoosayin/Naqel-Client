import React, { Component } from "react";

class OnGoingJobOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const completedByDriver = this.props.CompletedByDriver;
        const completedByTrader = this.props.CompletedByTrader;

        return <section>
            <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Completion Status</div>
                    </div>
                    <div className="row">
                        <div className="col-md-24">
                            <div className="entity-list theme-alt">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-certificate"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Completion By You</div>
                                        <div className="content-text-secondary">{completedByDriver ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-certificate"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Completion By Trader</div>
                                        <div className="content-text-secondary">{completedByTrader ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
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

export default OnGoingJobOptions;