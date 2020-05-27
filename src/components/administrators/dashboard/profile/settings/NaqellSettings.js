import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { getData, updateNaqelSettings } from "../../../AdministratorFunctions";

class NaqelSettings extends Component {
    constructor() {
        super();

        this.state = {
            Street: "",
            City: "",
            Country: "",
            ZIPCode: "",
            PhoneNumber: "",
            Website: "",
            BusinessName: "",
            BankName: "",
            AccountNumber: "",

            ValidStreet: true,
            ValidCity: true,
            ValidCountry: true,
            ValidZIPCode: true,
            ValidPhoneNumber: true,
            ValidWebsite: true,
            ValidBusinessName: true,
            ValidBankName: true,
            ValidAccountNumber: true,

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                Street: "",
                City: "",
                Country: "",
                ZIPCode: "",
                PhoneNumber: "",
                Website: "",
                BusinessName: "",
                BankName: "",
                AccountNumber: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "NaqelSettings"
            };

            await getData(request).then(response => {
                if (response.Message === "Naqel settings found.") {
                    let naqelSettings = response.NaqelSettings;

                    this.setState({
                        Street: naqelSettings.Street,
                        City: naqelSettings.City,
                        Country: naqelSettings.Country,
                        ZIPCode: naqelSettings.ZIPCode,
                        PhoneNumber: naqelSettings.PhoneNumber,
                        Website: naqelSettings.Website,
                        BusinessName: naqelSettings.BusinessName,
                        BankName: naqelSettings.BankName,
                        AccountNumber: naqelSettings.AccountNumber,
                    });
                }
                else {
                    this.setState({
                        Street: "",
                        City: "",
                        Country: "",
                        ZIPCode: "",
                        PhoneNumber: "",
                        Website: "",
                        BusinessName: "",
                        BankName: "",
                        AccountNumber: ""
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
        let {
            Errors,
            ValidStreet,
            ValidCity,
            ValidCountry,
            ValidZIPCode,
            ValidPhoneNumber,
            ValidWebsite,
            ValidBusinessName,
            ValidBankName,
            ValidAccountNumber,
        } = this.state;

        switch (field) {
            case "Street":
                ValidStreet = value !== "";
                Errors.Street = ValidStreet ? "" : "Street is required.";
                break;
            case "City":
                ValidCity = value !== "";
                Errors.City = ValidCity ? "" : "City is required.";
                break;
            case "Country":
                ValidCountry = value !== "";
                Errors.Country = ValidCountry ? "" : "Country is required.";
                break;
            case "ZIPCode":
                ValidZIPCode = value !== "";
                Errors.ZIPCode = ValidZIPCode ? "" : "ZIP code is required.";
                break;
            case "PhoneNumber":
                ValidPhoneNumber = value !== "";
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is required.";
                break;
            case "Website":
                ValidWebsite = value !== "";
                Errors.Website = ValidWebsite ? "" : "Website is required.";
                break;
            case "BusinessName":
                ValidBusinessName = value !== "";
                Errors.BusinessName = ValidBusinessName ? "" : "Business name is required.";
                break;
            case "BankName":
                ValidBankName = value !== "";
                Errors.BankName = ValidBankName ? "" : "Bank name is required.";
                break;
            case "AccountNumber":
                ValidAccountNumber = value !== "";
                Errors.AccountNumber = ValidAccountNumber ? "" : "Account number is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidStreet: ValidStreet,
            ValidCity: ValidCity,
            ValidCountry: ValidCountry,
            ValidZIPCode: ValidZIPCode,
            ValidPhoneNumber: ValidPhoneNumber,
            ValidWebsite: ValidWebsite,
            ValidBusinessName: ValidBusinessName,
            ValidBankName: ValidBankName,
            ValidAccountNumber: ValidAccountNumber,
        }, () => {
            this.setState({
                ValidForm: ValidStreet &&
                    ValidCity &&
                    ValidCountry &&
                    ValidZIPCode &&
                    ValidPhoneNumber &&
                    ValidWebsite &&
                    ValidBusinessName &&
                    ValidBankName &&
                    ValidAccountNumber
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedNaqelSettings = {
            Token: localStorage.Token,
            Street: this.state.Street,
            City: this.state.City,
            Country: this.state.Country,
            ZIPCode: this.state.ZIPCode,
            PhoneNumber: this.state.PhoneNumber,
            Website: this.state.Website,
            BusinessName: this.state.BusinessName,
            BankName: this.state.BankName,
            AccountNumber: this.state.AccountNumber,
        };

        this.setState({
            ShowPreloader: true
        });

        await updateNaqelSettings(updatedNaqelSettings).then(response => {
            this.setState({
                ShowPreloader: false
            });
        });
    }

    render() {
        const {
            Street,
            City,
            Country,
            ZIPCode,
            PhoneNumber,
            Website,
            BusinessName,
            BankName,
            AccountNumber,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Naqel Settings</div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="entity-list entity-list-expandable">
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Street" autoComplete="off"
                                    value={Street} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Street</div>
                            <div className="text-danger">{Errors.Street}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="City" autoComplete="off"
                                    value={City} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">City</div>
                            <div className="text-danger">{Errors.City}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Country" autoComplete="off"
                                    value={Country} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Country</div>
                            <div className="text-danger">{Errors.Country}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="ZIPCode" autoComplete="off"
                                    value={ZIPCode} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">ZIP Code</div>
                            <div className="text-danger">{Errors.ZIPCode}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autoComplete="off"
                                    value={PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Phone Number</div>
                            <div className="text-danger">{Errors.PhoneNumber}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-globe"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Website" autoComplete="off"
                                    value={Website} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Website</div>
                            <div className="text-danger">{Errors.Website}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-cog"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="BusinessName" autoComplete="off"
                                    value={BusinessName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Business Name</div>
                            <div className="text-danger">{Errors.BusinessName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-cog"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="BankName" autoComplete="off"
                                    value={BankName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Bank Name</div>
                            <div className="text-danger">{Errors.BankName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-list"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="AccountNumber" autoComplete="off"
                                    value={AccountNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Account Number</div>
                            <div className="text-danger">{Errors.AccountNumber}</div>
                        </div>
                    </div>
                    <div className="entity-list-item active">
                        <div className="item-icon">
                            <span className="fas fa-save"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Save Changes?</div>
                            <div className="content-text-secondary">This cannot be undone.</div>
                        </div>
                        <div className="item-content-expanded">
                            <input type="submit" value="Save" className="btn btn-primary" disabled={!ValidForm} />
                        </div>
                    </div>
                </div>
            </form>
            {ShowPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default NaqelSettings;