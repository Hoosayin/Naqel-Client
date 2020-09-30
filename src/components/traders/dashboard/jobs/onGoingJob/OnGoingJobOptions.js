/// <reference path=".js" />
import React, { Component } from "react";
import ApproveJobDialog from "./ApproveJobDialog";
import ReviewDialog from "./ReviewDialog";

class OnGoingJobOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverRated: this.props.DriverRated
        };
    }

    render() {
        const hasObjections = this.props.HasObjections;
        const completedByDriver = this.props.CompletedByDriver;
        const completedByTrader = this.props.CompletedByTrader;
        const onGoingJobID = this.props.OnGoingJobID;
        const driverRated = this.state.DriverRated;
        const showPreloader = this.state.ShowPreloader;

        return hasObjections ?
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="entity-list theme-alt">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-exclamation-circle"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.ObjectionableJob}</div>
                                    <div className="content-text-secondary">
                                        {driverRated ?
                                            Dictionary.ObjectionableJobDetails1 :
                                            Dictionary.ObjectionableJobDetails2}
                                    </div>
                                    <div className="content-text-secondary">
                                        {driverRated ? <span class="badge back-color-danger">{Dictionary.DriverIsRated}</span> : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {driverRated ? null :
                            <div className="text-right">
                                <button className="btn btn-secondary"
                                    data-toggle="modal"
                                    data-target="#review-dialog-from-on-going-job">{Dictionary.RateDriver}</button>
                            </div>}
                    </div>
                </div>
                {driverRated ?
                    null :
                    <ReviewDialog OnGoingJobID={onGoingJobID}
                        OnOK={() => {
                            this.setState({
                                DriverRated: true
                            });
                        }} />}
            </section> :
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.JobCompletionStatus}</div>
                            <div className="type-sh4">{Dictionary.JobCompletionStatusDetails}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-24">
                                <div className="entity-list theme-alt">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-certificate"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.CompletedByDriver}</div>
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
                                            <div className="content-text-primary">{Dictionary.CompletedByTrader}</div>
                                            <div className="content-text-secondary">{completedByTrader ?
                                                <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            {completedByDriver ? <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#approve-job-dialog">{Dictionary.Approve}</button> : null}
                        </div>
                    </div>
                </div>
                <ApproveJobDialog OnOK={this.props.OnJobRemoved} />
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
        OnGoingJob: "أوامر العمل القائمة",
        Searching: "يبحث",
        JobNotFound: "تعذر العثور على امر عمل",
        ObjectionsMessage: "هذه الوظيفة لها اعتراضات ، ولا يمكن إنهاؤها الآن. الإجراءات معلقة عن طريق النقل. لمزيد من المعلومات ، يرجى النقر على علامة التبويب اعتراض",
        Job: "امر العمل",
        Driver: "سائق",
        Truck: "شاحنة",
        Map: "خريطة",
        Objections: "اعتراضات",
    };
}
else {
    Dictionary = {
        OnGoingJob: "On-Going Job",
        Searching: "Searhcing",
        JobNotFound: "Couldn't Find Your Job",
        ObjectionsMessage: "This job has objections, and it cannot be finished now. Actions are pending by Naqel. For more information, please tap on Objectiona tab",
        Job: "Job",
        Driver: "Driver",
        Truck: "Truck",
        Map: "Map",
        Objections: "Objections",
    };
}

export default OnGoingJobOptions;