import React, { Component } from "react";
import { getData } from "../../TraderFunctions";
import ProfilePhoto from "./ProfilePhoto";
import DocumentsList from "./documents/DocumentsList";

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
            DateOfBirth: ""
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Trader"
            };

            getData(request).then(response => {
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
                        DateOfBirth: trader.DateOfBirth
                    });
                }
            });
        }
    };

    render() {
        return (
            <section>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group" style={{ marginBottom: "5px", }}>
                                    <ProfilePhoto />
                                </div>
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {this.state.FirstName + " " + this.state.LastName}
                                    </div>
                                <div className="type-sh3">
                                    <span className="fas fa-briefcase"></span>   Trader
                                    </div>
                                <div>
                                    <ol className="list-items theme-alt">
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-at" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Username:</a>
                                                </div>
                                                <div className="col-md-6">
                                                    {this.state.Username}
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-envelope" style={{ color: "#008575", }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Email:</a>
                                                </div>
                                                <div className="col-md-6">
                                                    {this.state.Email}
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-phone" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Phone Number:</a>
                                                </div>
                                                <div className="col-md-6">
                                                    {this.state.PhoneNumber}
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#00221E" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="type-h3" style={{ paddingTop: "10px", }}>
                                    Details
                                    </div>
                                <ol className="list-items theme-alt">
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-birthday-cake" style={{ color: "#008575", }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Date of Birth:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.DateOfBirth}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className={(this.state.Gender === "Male") ? "fas fa-male" : "fas fa-female"} style={{ color: "#008575", }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Gender:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.Gender}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-flag" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Nationality:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.Nationality}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-map-marker" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Address:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.Address}
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentsList />
            </section>
        );
    }
};

export default Profile;