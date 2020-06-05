import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import DocumentsList from "./documents/DocumentsList";
import { getData } from "../../TransportCompanyResponsiblesFunctions";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            Email: "",
            Username: "",
            PhoneNumber: "",
            InternalNumber: "", 
            CommercialRegisterNumber: "",
            Active: false,
        };
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TransportCompanyResponsible"
            };

            await getData(request).then(response => {
                if (response.Message === "Transport company responsible found.") {
                    let transportCompanyResponsible = response.TransportCompanyResponsible;

                    this.setState({
                        Name: transportCompanyResponsible.Name,
                        Email: transportCompanyResponsible.Email,
                        Username: transportCompanyResponsible.Username,
                        PhoneNumber: transportCompanyResponsible.PhoneNumber,
                        InternalNumber: transportCompanyResponsible.InternalNumber,
                        CommercialRegisterNumber: transportCompanyResponsible.CommercialRegisterNumber,
                        Active: transportCompanyResponsible.Active,
                    });
                }
                else {
                    this.setState({
                        Name: "",
                        Email: "",
                        Username: "",
                        PhoneNumber: "",
                        InternalNumber: "",
                        CommercialRegisterNumber: "",
                        Active: false,
                    });
                }
            });
        }
    }

    render() {
        const {
            Name,
            Email,
            Username,
            PhoneNumber,
            InternalNumber,
            CommercialRegisterNumber,
            Active
        } = this.state;
        
        return <section>
            <PageHeading Heading="PROFILE" />
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="type-h3 color-default p-t-xxs">{Name}</div>
                    <div className="type-sh3">
                        <span className="fas fa-copyright m-r-xxxs" style={{ color: "#606060" }}></span>Transport Company</div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-at"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Username</div>
                                        <div className="content-text-secondary">{Username}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Email</div>
                                        <div className="content-text-secondary">{Email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-phone"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Phone Number</div>
                                        <div className="content-text-secondary">{PhoneNumber}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-hashtag"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Internal Number</div>
                                            <div className="content-text-secondary">{InternalNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-hashtag"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Commercial Register Number</div>
                                            <div className="content-text-secondary">{CommercialRegisterNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-globe-asia"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Active</div>
                                        <div className="content-text-secondary">{Active ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
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

export default Profile;