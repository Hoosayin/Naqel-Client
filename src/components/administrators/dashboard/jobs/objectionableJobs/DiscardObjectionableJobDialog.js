import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { discardObjectionableJob } from "../../../AdministratorFunctions";

class DiscardObjectionableJobDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onDiscard = this.onDiscard.bind(this);
    }

    onDiscard = async () => {
        this.setState({
            ShowPreloader: true
        });

        const discardedObjectionableJob = {
            Token: localStorage.Token,
            OnGoingJobID: this.props.OnGoingJobID
        };

        await discardObjectionableJob(discardedObjectionableJob).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Objectionable job is discarded.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            JobNumber
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`discard-objectionable-job-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
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
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">{`Discard Objectionable Job ${JobNumber}`}</div>
                                            <div className="type-sh3 m-b-xxs">Make sure you have taken all the neccesary actions before discrding this job. Are you sure you want to proceed?</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-danger" onClick={this.onDiscard}>Discard</button>
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

export default DiscardObjectionableJobDialog;