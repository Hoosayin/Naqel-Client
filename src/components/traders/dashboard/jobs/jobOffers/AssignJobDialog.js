import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addOnGoingJobFromJobOffer } from "../../../TraderFunctions";
import Strings from "../../../../../res/strings";

class ProfileDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onAssignNow = this.onAssignNow.bind(this);
    }

    onAssignNow = async () => {
        if (!this.props.CanAssign()) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newOnGoingJob = {
            Token: localStorage.Token,
            DriverRequestID: this.props.DriverRequestID
        };

        console.log("Going to add on-going job...");

        await addOnGoingJobFromJobOffer(newOnGoingJob).then(response => {
            if (response.Message === "On-going job is added.") {
                this.setState({
                    ShowPreloader: false
                });

                this.cancelButton.click();

                this.props.OnOK();
                return;
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }

            
        });
    };

    render() {
        const index = this.props.Index;
        const driver = this.props.Driver;
        const price = this.props.Price;

        return <section>
            <div className="modal modal-center-vertical" id={`assign-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div class="jumbotron" dir={GetDirection()}>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-24">
                                            <img alt="new.png" src="./images/new.png" height="100" />
                                            <div class="type-h4">{Dictionary.StartJobWith} <span class="color-default">{`${driver.FirstName} ${driver.LastName}`}</span>.</div>
                                            <div class="type-sh3">{Dictionary.YourAmountIs} <span class="color-default">{`${price} ${Strings.SAUDI_RIYAL}`}</span>.</div>
                                            <p><span class="color-default">{Dictionary.ImportantNote}</span> {Dictionary.AfterThisStep} <span class="color-default">{`${price} ${Strings.SAUDI_RIYAL}`}</span> {Dictionary.AfterCompletion}.</p>
                                            <div class="text-right">
                                                <button class="btn btn-primary" onClick={this.onAssignNow}>{Dictionary.AssignNow}</button>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        StartJobWith: "أنت على وشك البدء بعمل جديد",
        YourAmountIs: "مبلغ الدفع هو",
        ImportantNote: ":ملاحظة مهمة",
        AfterThisStep: "بعد هذه الخطوة ، ستكون منخرطًا في مهمة مستمرة. عليك أن تدفع",
        AfterCompletion: "بعد الانتهاء من عملك من قسم المدفوعات",
        AssignNow: "تعيين الآن"
    };
}
else {
    Dictionary = {
        StartJobWith: "You are About to Start a New Job with",
        YourAmountIs: "Your Payment Amount is",
        ImportantNote: "Important Note:",
        AfterThisStep: "After this step, you'll be engaged in an On-Going Job. You have to pay",
        AfterCompletion: "after the completion of your job from the Payments section",
        AssignNow: "Assign Now"
    };
}

export default ProfileDialog;