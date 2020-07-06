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
                                    <div className="content-text-secondary">{Dictionary.ObjectinoableJobSubtitle}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> :
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.JobCompletionStatus}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-24">
                                <div className="entity-list theme-alt">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-certificate"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.FinishedByYou}</div>
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
                                            <div className="content-text-primary">{Dictionary.ApprovedByTrader}</div>
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
                                data-target="#finish-job-dialog">{Dictionary.FinishJob}</button>
                        </div>
                    </div>
                </div>
                <FinishJobDialog CompletedByDriver={completedByDriver}
                    OnOK={() => { this.props.OnJobFinished(); }} />
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
        ObjectionableJob: "وظيفة مرفوضة",
        ObjectinoableJobSubtitle: "!نظرًا لأن عملك لديه اعتراضات ، سيراجعه فريق النقل ، وبالتالي يتخذ أي إجراءات مناسبة",
        JobCompletionStatus: "حالة إتمام الوظيفة",
        FinishedByYou: "الانتهاء منك",
        ApprovedByTrader: "وافق عليه التاجر",
        FinishJob: "إنهاء المهمة"
    };
}
else {
    Dictionary = {
        ObjectionableJob: "Objectionable Job",
        ObjectinoableJobSubtitle: "Since your job has got objections, Naqel team will review them, and consequently take any suitable actions!",
        JobCompletionStatus: "Job Completion Status",
        FinishedByYou: "Finished By You",
        ApprovedByTrader: "Approved By Trader",
        FinishJob: "Finish Job"
    };
}

export default OnGoingJobOptions;