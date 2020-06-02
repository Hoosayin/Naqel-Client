import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { exonerateTrader } from "../../AdministratorFunctions";

class ExonerateTraderDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ExonerateDate: "",
            Reason: "",

            ValidExonerateDate: false,
            ValidReason: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                ExonerateDate: "",
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
        let {
            Errors,
            ValidExonerateDate,
            ValidReason
        } = this.state;

        switch (field) {
            case "ExonerateDate":
                ValidExonerateDate = (value !== "");
                Errors.ExonerateDate = ValidExonerateDate ? "" : "Date is required";

                if (Errors.ExonerateDate !== "") {
                    break;
                }

                ValidExonerateDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.ExonerateDate = ValidExonerateDate ? "" : "Date must be later than yesterday.";
                break;
            case "Reason":
                ValidReason = (value !== "");
                Errors.Reason = ValidReason ? "" : "Reason is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidExonerateDate: ValidExonerateDate,
            ValidReason: ValidReason,
        }, () => {
                this.setState({
                    ValidForm: ValidExonerateDate &&
                        this.state.ValidReason
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

        const exoneratedTrader = {
            Token: localStorage.Token,
            TraderID: this.props.Trader.TraderID,
            ExonerateDate: this.state.ExonerateDate,
            Reason: this.state.Reason
        };

        await exonerateTrader(exoneratedTrader).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Trader is exonerated.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });


    }

    render() {
        const {
            ExonerateDate,
            Reason,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index,
            Trader
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`exonerate-trader-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                                                <div className="type-h3 color-default p-t-n">Exonerate Trader</div>
                                                <div className="type-sh3 m-b-xxs">You are going to exonerate
                                                    <span className="color-default">{` ${Trader.FirstName} ${Trader.LastName}`}</span>.
                                                    </div>
                                                <div className="form-group">
                                                    <label className="control-label">Exonerate Till</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ExonerateDate" className="form-control" autoComplete="off"
                                                        value={ExonerateDate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.ExonerateDate}</span>
                                                </div>
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
                                            <input type="submit" value="Exonerate Now" className="btn btn-danger" disabled={!ValidForm} />
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

export default ExonerateTraderDialog;