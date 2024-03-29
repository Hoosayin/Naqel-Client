import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader.js";
import { getData, updateEntryExitCard } from "../../../../DriverFunctions.js";

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
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "EntryExitCard"
            };

            getData(request).then(response => {
                if (response.Message === "Entry/exit card found.") {
                    let entryExitCard = response.EntryExitCard;

                    this.setState({
                        EntryExitNumber: entryExitCard.EntryExitNumber,
                        Type: entryExitCard.Type,
                        ReleaseDate: entryExitCard.ReleaseDate,
                        NumberOfMonths: entryExitCard.NumberOfMonths
                    });
                }
                else {
                    this.setState({
                        EntryExitNumber: "",
                        Type: "Simple",
                        ReleaseDate: new Date(),
                        NumberOfMonths: ""
                    });
                }
            });
        }
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
                Errors.EntryExitNumber = ValidEntryExitNumber ? "" : Dictionary.EntryExitNumberError;
                break;
            case "ReleaseDate":
                ValidReleaseDate = (new Date(value).getTime() <= new Date());
                Errors.ReleaseDate = ValidReleaseDate ? "" : Dictionary.ReleaseDateError;
                break;
            case "NumberOfMonths":
                ValidNumberOfMonths = (value !== "");
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : Dictionary.NumberOfMonthsError1;

                if (Errors.NumberOfMonths !== "") {
                    break;
                }

                ValidNumberOfMonths = (value > 0)
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : Dictionary.NumberOfMonthsError2;

                if (Errors.NumberOfMonths !== "") {
                    break;
                }

                let releaseDate = new Date(this.state.ReleaseDate);
                let expiryDate = new Date(releaseDate.setMonth(releaseDate.getMonth() + value));

                ValidNumberOfMonths = (expiryDate > new Date());
                Errors.NumberOfMonths = ValidNumberOfMonths ? "" : Dictionary.NumberOfMonthsError3;
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
            Token: localStorage.Token,
            EntryExitNumber: this.state.EntryExitNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            NumberOfMonths: this.state.NumberOfMonths
        };

        console.log("Going to update Entry/Exit Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateEntryExitCard(updatedEntryExitCard).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Entry/Exit card is updated.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="edit-entry-exit-card-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.EditEntryExitCard}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.EntryExitNumber}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="EntryExitNumber" className="form-control" autoComplete="off"
                                                        value={this.state.EntryExitNumber} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.EntryExitNumber}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CardType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <div class="combobox">
            <select class="form-control"
                style={{
                    width: "100%",
                    maxWidth: "296px",
                    minWidth: "88px"
                }}
                onChange={event => {
                    this.setState({
                        Type: event.target.value
                    }, this.validateField("", ""));
                }}
                value={this.state.Type === "Simple" ? Dictionary.Simple : Dictionary.Multiple}>
                <option value="Simple">{Dictionary.Simple}</option>
            <option value="Multiple">{Dictionary.Multiple}</option>
            </select>
        </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.ReleaseDate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ReleaseDate" className="form-control" autoComplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.NumberOfMonths}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="NumberOfMonths" className="form-control" autoComplete="off"
                                                        value={this.state.NumberOfMonths} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.NumberOfMonths}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Update} className="btn btn-primary" disabled={!this.state.ValidForm} />
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EditEntryExitCard: "تحرير بطاقة الدخول / الخروج",
        EntryExitNumber: "رقم الدخول / الخروج",
        CardType: "نوع البطاقة",
        Simple: "بسيط",
        Multiple: "مضاعف",
        ReleaseDate: "يوم الاصدار",
        NumberOfMonths: "عدد الأشهر",
        Update: "تحديث",
        EntryExitNumberError: "رقم الدخول / الخروج مطلوب",
        ReleaseDateError: ".يجب ألا يكون تاريخ الإصدار في وقت لاحق اليوم",
        NumberOfMonthsError1: ".عدد الأشهر مطلوب",
        NumberOfMonthsError2: ".يجب أن يكون عدد الأشهر أكبر من 0",
        NumberOfMonthsError3: ".انتهت صلاحية بطاقتك",  
    };
}
else {
    Dictionary = {
        EditEntryExitCard: "Edit Entry/Exit Card",
        EntryExitNumber: "Entry/Exit Number",
        CardType: "Card Type",
        Simple: "Simple",
        Multiple: "Multiple",
        ReleaseDate: "Release Date",
        NumberOfMonths: "Number of Months",
        Update: "Update",
        EntryExitNumberError: "Entry/exit number is required.",
        ReleaseDateError: "Release date must not be later than today.",
        NumberOfMonthsError1: "Number of months is required.",
        NumberOfMonthsError2: "Number of months must be greater than 0.",
        NumberOfMonthsError3: "Your card is expired.",
    };
}

export default EditEntryExitCardDialog;