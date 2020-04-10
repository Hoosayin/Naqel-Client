import React, { Component } from "react";

class TraderTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const trader = this.props.Trader;
        const profilePhoto = this.props.ProfilePhoto ?
            this.props.ProfilePhoto : "./images/defaultProfilePhoto.png";

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group" style={{ marginBottom: "5px", }}>
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={profilePhoto} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                {trader.FirstName + " " + trader.LastName}
                            </div>
                            <div className="type-sh3">
                                <span className="fas fa-briefcase" style={{ color: "#606060" }}></span>   {trader.Type}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className={(trader.Gender === "Male") ? "fas fa-male" : "fas fa-female"}></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Gender</div>
                                                <div className="content-text-secondary">{trader.Gender}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-birthday-cake"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Birthday</div>
                                                <div className="content-text-secondary">{trader.DateOfBirth}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-flag"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Nationality</div>
                                                <div className="content-text-secondary">{trader.Nationality}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Email</div>
                                                <div className="content-text-secondary">{trader.Email}</div>
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
                                                <div className="content-text-secondary">{trader.PhoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default TraderTab;