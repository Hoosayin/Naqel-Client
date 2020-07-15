import React, { Component } from "react";
import { getData } from "../../TraderFunctions";
import ProfilePhoto from "./ProfilePhoto";
import DocumentsList from "./documents/DocumentsList";
import PageHeading from "../../../../controls/PageHeading";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Username: "",
            Email: "",
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",
            Type: "",
            Active: null
        };
    }

    async componentDidMount() {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "Trader"
            };

            await getData(request).then(response => {
                if (response.Message === "Trader found.") {
                    let trader = response.Trader;

                    this.setState({
                        Username: trader.Username,
                        Email: trader.Email,
                        FirstName: trader.FirstName,
                        LastName: trader.LastName,
                        Address: trader.Address,
                        PhoneNumber: trader.PhoneNumber,
                        Gender: trader.Gender,
                        Nationality: trader.Nationality,
                        DateOfBirth: trader.DateOfBirth,
                        Type: trader.Type,
                        Active: trader.Active
                    });
                }
            });
        }
    }

    render() {
        return (
            <section>
                {/* <PageHeading Heading="PROFILE" /> */}
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <ProfilePhoto />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3 color-default p-t-n">
                                    {`${this.state.FirstName} ${this.state.LastName}`}
                                </div>
                                <div className="type-sh3">
                                    <span className="fas fa-briefcase m-r-xxxs" style={{ color: "#606060" }}></span>{this.state.Type === "Trader" ? 
                                    Dictionary.Trader : Dictionary.Broker}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-globe-asia"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Active}</div>
                                                    <div className="content-text-secondary">{(this.state.Active) ?
                                                        <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                        <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.PhoneNumber}</div>
                                                    <div className="content-text-secondary">{this.state.PhoneNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-at"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Username}</div>
                                                    <div className="content-text-secondary">{this.state.Username}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-envelope"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Email}</div>
                                                    <div className="content-text-secondary">{this.state.Email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h3" style={{ paddingTop: "0px" }}>{Dictionary.Details}</div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list theme-alt">
                                            <div className="entity-list-item">
                                                <div className="item-icon" style={{ backgroundColor: "transparent" }}>
                                                    <span className="fas fa-birthday-cake color-default"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Birthday}</div>
                                                    <div className="content-text-secondary">{this.state.DateOfBirth}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list theme-alt">
                                            <div className="entity-list-item">
                                                <div className="item-icon" style={{ backgroundColor: "transparent" }}>
                                                    <span className={(this.state.Gender === "Male") ? "fas fa-male color-default" : "fas fa-female color-default"}></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Gender}</div>
                                                    <div className="content-text-secondary">{this.state.Gender}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entity-list theme-alt">
                                            <div className="entity-list-item">
                                                <div className="item-icon" style={{ backgroundColor: "transparent" }}>
                                                    <span className="fas fa-flag color-default"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Nationality}</div>
                                                    <div className="content-text-secondary">{this.state.Nationality}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list theme-alt">
                                            <div className="entity-list-item">
                                                <div className="item-icon" style={{ backgroundColor: "transparent" }}>
                                                    <span className="fas fa-map-marker-alt color-default"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Address}</div>
                                                    <div className="content-text-secondary">{this.state.Address}</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentsList />
            </section>
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Trader: "التاجر",
        Broker: "وسيط",
        Active: "نشيط",
        PhoneNumber: "رقم الهاتف",
        Username: "اسم المستخدم",
        Email: "البريد الإلكتروني",
        Details: "تفاصيل",
        Birthday: "عيد الميلاد",
        Gender: "جنس",
        Nationality: "الجنسية",
        Address: "عنوان"
    };
}
else {
    Dictionary = {
        Trader: "Trader",
        Broker: "Broker",
        Active: "Active",
        PhoneNumber: "Phone Number",
        Username: "Username",
        Email: "Email",
        Details: "Details",
        Birthday: "Birthday",
        Gender: "Gender",
        Nationality: "Nationality",
        Address: "Address"
    };
}

export default Profile;