import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { addDriverObjectionReason } from "../../../../AdministratorFunctions";

class AddObjectionReasonDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Reason: "",
            ValidReason: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Reason: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidReason = this.state.ValidReason;

        switch (field) {
            case "Reason":
                ValidReason = (value !== "");
                Errors.Reason = ValidReason ? "" : "Reason is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidReason: ValidReason,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidReason
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newDriverObjectionReason = {
            Token: localStorage.Token,
            Reason: this.state.Reason
        };

        await addDriverObjectionReason(newDriverObjectionReason).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Objection reason is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        const {
            Reason,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-driver-objection-reason-dialog`}
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
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">Add New Reason</div>
                                                <div class="form-group">
                                                    <label className="control-label">Reason</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <textarea rows="6" class="form-control" name="Reason" style={{ maxWidth: "100%" }}
                                                        value={Reason} onChange={this.onChange}></textarea>
                                                    <span className="text-danger">{Errors.Reason}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Add" className="btn btn-primary" disabled={!ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default AddObjectionReasonDialog;