import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import { finishJob } from "../../../DriverFunctions";

class FinishJobDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Progress: null
        };

        this.onYes = this.onYes.bind(this);
    }

    onYes = async () => {
        this.setState({
            Progress: true
        });

        const finishedJob = {
            Token: localStorage.Token,
        }

        console.log("Going to finish the job...");

        await finishJob(finishedJob).then(response => {
            if (response.Message === "Job is finished.") {
                this.setState({
                    Progress: false
                });

                this.props.OnOK();
            }
            else {
                this.setState({
                    Progress: false
                });
            }
        });
    }

    render() {
        const completedByDriver = this.props.CompletedByDriver;

        return <section>
            <div className="modal modal-center-vertical" id="finish-job-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary"
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            {this.state.Progress ? <ProgressRing /> : null}
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.FinishJob}</div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron" dir={GetDirection()}>
                                <div class="container">
                                    <div class="row">
                                        {completedByDriver ? 
                                            <div class="col-md-24">
                                                <img alt="confetti.png" src="./images/confetti.png" height="100" />
                                                <div class="type-h3">{Dictionary.FinishJobDetails1}</div>
                                                <div class="type-sh3">{Dictionary.FinishJobDetails2}</div>
                                        <p><span class="color-default">{Dictionary.ImportantNote}</span> {Dictionary.Note}</p>
                                            </div> : 
                                            <div class="col-md-24">
                                                <p>{Dictionary.Question}</p>
                                                <div class="text-right">
                                                    <button class="btn btn-primary" onClick={this.onYes}>{Dictionary.Question}</button>
                                                </div>
                                            </div>}
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        FinishJob: "إنهاء المهمة",
        FinishJobDetails1: "تهانينا! لقد أنهيت عملك",
        FinishJobDetails2: "موافقة التاجر معلقة في الوقت الراهن",
        ImportantNote: ":ملاحظة مهمة",
        Note: ".يمكنك عرض هذه الوظيفة في علامة تبويب المهام المكتملة ، بمجرد موافقة التاجر على إكمال المهمة",
        Question: "!هل أنت متأكد أنك تريد إنهاء هذه المهمة؟ سيوافق التاجر الخاص بك على إكمال العمل بعد ذلك",
        Yes: "نعم"
    };
}
else {
    Dictionary = {
        FinishJob: "Finish Job",
        FinishJobDetails1: "Congratulations! You Have Finished Your Job",
        FinishJobDetails2: "The Trader's Approval is Pending at the Moment",
        ImportantNote: "Important Note:",
        Note: "You can view this job in Completed Jobs tab, once the trader approves job completion.",
        Question: "Are you sure you want to finish this job? Your trader will approve job completion afterwards!",
        Yes: "Yes"
    };
}

export default FinishJobDialog;