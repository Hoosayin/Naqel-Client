import React, { Component } from "react";
import FinishJobDialog from "./FinishJobDialog";

class OnGoingJobOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hasObjections = this.props.HasObjections;
        const completedByDriver = this.props.CompletedByDriver;
        const completedByTrader = this.props.CompletedByTrader;

        let jumbotronContent;

        return hasObjections ?
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Discard the Job?</div>
                            <div className="type-sh3">This will refund Trader's amount. You can take other jobs afterwards.</div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-danger">Discard</button>
                        </div>
                    </div>
                </div>
            </section> :
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Job Completion Status</div>
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
                        <div className="text-right">
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#finish-job-dialog">Finish Job</button>
                        </div>
                    </div>
                </div>
                <FinishJobDialog CompletedByDriver={completedByDriver}
                    OnOK={() => { this.props.OnJobFinished(); }} />
            </section>;
             
    }
};

export default OnGoingJobOptions;