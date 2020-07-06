import React, { Component } from "react";
import ProfilePhoto from "./ProfilePhoto";
import DocumentsList from "./documents/DocumentsList.js";
import Rating from "../../../../controls/Rating";
import { getData } from "../../DriverFunctions.js";
import PageHeading from "../../../../controls/PageHeading";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            Username: "",
            Password: "",
            Email: "",
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",
            Active: null,
            RatingAndReviews: {},

            WarningAlert: null,
            Errors: {}
        };
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Driver"
            };

            await getData(request).then(response => {
                if (response.Message === "Driver found.") {
                    let driver = response.Driver;

                    this.setState({
                        Username: driver.Username,
                        Password: driver.Password,
                        Email: driver.Email,
                        FirstName: driver.FirstName,
                        LastName: driver.LastName,
                        DateOfBirth: driver.DateOfBirth,
                        Gender: driver.Gender,
                        Address: driver.Address,
                        PhoneNumber: driver.PhoneNumber,
                        Nationality: driver.Nationality,
                        Active: driver.Active,
                        RatingAndReviews: response.RatingAndReviews
                    });
                }
                else {
                    this.setState({
                        Username: "",
                        Password: "",
                        Email: "",
                        FirstName: "",
                        LastName: "",
                        Address: "",
                        PhoneNumber: "",
                        Gender: "",
                        Nationality: "",
                        DateOfBirth: "",
                        Active: null,
                        RatingAndReviews: {}
                    });
                }
            });
        }
    }

    render() {
        const ratingAndReviews = this.state.RatingAndReviews;

        return <section>
            {/* <PageHeading Heading="PROFILE" /> */}
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ProfilePhoto />
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                {this.state.FirstName + " " + this.state.LastName}
                            </div>
                            <div className="type-sh3">
                                <span className="fas fa-briefcase m-r-xxxs" style={{ color: "#606060" }}></span>{Dictionary.Driver}</div>
                            <div className="type-sh3">
                                <span><Rating Rating={ratingAndReviews.Reviews > 0 ? ratingAndReviews.Rating : 0}
                                    Color="" Size="rating-small"
                                    Label={ratingAndReviews.Reviews > 0 ?
                                        `(${ratingAndReviews.Reviews} ${Dictionary.Reviews})` : Dictionary.NoReviews} /></span>
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
                                                <div className="content-text-secondary">{(this.state.Active === 1) ?
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
        Driver: "سائق",
        Reviews: "المراجعات",
        NoReviews: "لم يتم تقديم تعليقات",
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
        Driver: "Driver",
        Reviews: "Review(s)",
        NoReviews: "No Reviews",
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