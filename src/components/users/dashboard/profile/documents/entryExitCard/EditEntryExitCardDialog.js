import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { updateEntryExitCard } from "../../../../DriverFunctions.js";

class EditEntryExitCardDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            EntryExitNumber: "",
            Type: "Simple",
            ReleaseDate: new Date(),
            NumberOfMonths: "",

            ValidEntryExitNumber: true,
            ValidReleaseDate: true,
            ValidNumberOfMonths: true,

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

    componentDidMount() {
        if (localStorage.userToken) {
            const entryExitCard = jwt_decode(localStorage.userToken).EntryExitCard;

            if (entryExitCard) {
                this.setState({
                    EntryExitNumber: entryExitCard.EntryExitNumber,
                    Type: entryExitCard.Type,
                    ReleaseDate: entryExitCard.ReleaseDate,
                    NumberOfMonths: entryExitCard.NumberOfMonths,
                });

                return;
            }
        }

        this.setState({
            EntryExitNumber: "",
            Type: "Simple",
            ReleaseDate: new Date(),
            NumberOfMonths: "",
        });
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

        const updatedEntryExitCard = {
            Token: localStorage.getItem("userToken"),
            EntryExitNumber: this.state.EntryExitNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            NumberOfMonths: this.state.NumberOfMonths,
        }

        console.log("Going to update Entry/Exit Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateEntryExitCard(updatedEntryExitCard).then(response => {
            if (response.Message === "Entry/Exit card is updated.") {
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
            <section>
                <div class="modal" id="edit-entry-exit-card-dialog"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div class="type-h3">Edit Entry/Exit Card</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label">Entry/Exit Number</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="text" name="EntryExitNumber" class="form-control" autocomplete="off"
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
                                                            <li><a onClick={() => {
                                                                this.setState({ Type: "Simple" });
                                                                this.validateField("", "");
                                                            }}>Simple</a></li>
                                                            <li><a onClick={() => {
                                                                this.setState({ Type: "Multiple" });
                                                                this.validateField("", "");
                                                            }}>Multiple</a></li>
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
                                        <input type="submit" value="Update" class="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default EditEntryExitCardDialog;