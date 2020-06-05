import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader.js";
import { addEntryExitCard } from "../../../../DriverFunctions.js";

class AddEntryExitCardDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            EntryExitNumber: "",
            Type: "Simple",
            ReleaseDate: new Date(),
            NumberOfMonths: "",

            ValidEntryExitNumber: false,
            ValidReleaseDate: false,
            ValidNumberOfMonths: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                EntryExitNumber: "",
                ReleaseDate: "",
                NumberOfMonths: "",
            },
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

        let ValidEntryExitNumber = this.state.ValidEntryExitNumber;
        let ValidReleaseDate = this.state.ValidReleaseDate;
        let ValidNumberOfMonths = this.state.ValidNumberOfMonths;

        switch (field) {
            case "EntryExitNumber":
                ValidEntryExitNumber = (value !== "");
                Errors.EntryExitNumber = ValidEntryExitNumber ? "" : "Entry/exit number is required.";
                break;
            case "ReleaseDate":
                ValidReleaseDate = (new Date(value).getTime() <= new Date());
                Errors.ReleaseDate = ValidReleaseDate ? "" : "Release date must not be later than today.";
                break;
            case "NumberOfMonths":
                ValidNumberOfMonths = (value !== "");
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : "Number of months is required.";

                if (Errors.NumberOfMonths !== "") {
                    break;
                }

                ValidNumberOfMonths = (value > 0)
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : "Number of months must be greater than 0.";

                if (Errors.NumberOfMonths !== "") {
                    break;
                }

                let releaseDate = new Date(this.state.ReleaseDate);
                let expiryDate = new Date(releaseDate.setMonth(releaseDate.getMonth() + value));

                ValidNumberOfMonths = (expiryDate > new Date());
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : `Your card is expired if it is for ${value} months. Your card might be expired on ${expiryDate.toLocaleString()}`;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidEntryExitNumber: ValidEntryExitNumber,
            ValidReleaseDate: ValidReleaseDate,
            ValidNumberOfMonths: ValidNumberOfMonths,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidEntryExitNumber &&
                        this.state.ValidReleaseDate &&
                        this.state.ValidNumberOfMonths
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newEntryExitCard = {
            Token: localStorage.Token,
            EntryExitNumber: this.state.EntryExitNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            NumberOfMonths: this.state.NumberOfMonths
        };

        console.log("Going to add Entry/Exit Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await addEntryExitCard(newEntryExitCard).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Entry/Exit card is added.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-entry-exit-card-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
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
                                                <div className="type-h3 color-default p-t-xxs">Add Entry/Exit Card</div>
                                                <div className="form-group">
                                                    <label className="control-label">Entry/Exit Number</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="EntryExitNumber" className="form-control" autoComplete="off"
                                                        value={this.state.EntryExitNumber} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.EntryExitNumber}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Card Type</label><br />
                                                    <div className="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                        <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                            <span>{this.state.Type}</span>
                                                            <span className="caret"></span>
                                                        </button>
                                                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                            <li><a onClick={() => { this.setState({ Type: "Simple" }); }}>Simple</a></li>
                                                            <li><a onClick={() => { this.setState({ Type: "Multiple" }); }}>Multiple</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Release Date</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ReleaseDate" className="form-control" autoComplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Number of Months</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="NumberOfMonths" className="form-control" autoComplete="off"
                                                        value={this.state.NumberOfMonths} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.NumberOfMonths}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Add" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default AddEntryExitCardDialog;