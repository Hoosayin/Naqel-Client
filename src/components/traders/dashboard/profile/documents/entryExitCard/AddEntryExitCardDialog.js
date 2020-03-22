import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
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
            Token: localStorage.getItem("userToken"),
            EntryExitNumber: this.state.EntryExitNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            NumberOfMonths: this.state.NumberOfMonths,
        }

        console.log("Going to add Entry/Exit Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await addEntryExitCard(newEntryExitCard).then(response => {
            if (response.Message === "Entry/Exit card is added.") {
                localStorage.setItem("userToken", response.Token);
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section class="text-left">
                <div class="modal" id="add-entry-exit-card-dialog"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div class="type-h3">Add Entry/Exit Card</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label">Entry/Exit Number</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="number" name="EntryExitNumber" class="form-control" autocomplete="off"
                                                        value={this.state.EntryExitNumber} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.EntryExitNumber}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Card Type</label><br />
                                                    <div class="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                        <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                            <span>{this.state.Type}</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                            <li><a onClick={() => { this.setState({ Type: "Simple" }); }}>Simple</a></li>
                                                            <li><a onClick={() => { this.setState({ Type: "Multiple" }); }}>Multiple</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Release Date</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="date" name="ReleaseDate" class="form-control" autocomplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Number of Months</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="number" name="NumberOfMonths" class="form-control" autocomplete="off"
                                                        value={this.state.NumberOfMonths} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.NumberOfMonths}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Add" class="btn btn-primary" disabled={!this.state.ValidForm} />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>            
        );
    }
};

export default AddEntryExitCardDialog;