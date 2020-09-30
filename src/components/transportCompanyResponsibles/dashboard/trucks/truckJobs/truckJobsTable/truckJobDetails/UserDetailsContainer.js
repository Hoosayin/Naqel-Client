import React, { Component } from "react";

class UserDetailsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Driver,
            Trader,
        } = this.props;

        return <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
            <div className="type-h4 color-default p-t-xxxs">{Dictionary.Participants}</div>

            <div className="row">
                <div className="col-md-12">
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <img src={Driver.PhotoURL ? Driver.PhotoURL : "./images/defaultProfilePhoto.png"} alt="profile_photo.png"
                                    height="34"
                                    width="34"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        margin: "0px",
                                        border: "3px solid #3A3A3C"
                                    }} />
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{`${Driver.FirstName} ${Driver.LastName}`}</div>
                                <div className="content-text-secondary color-default">{`@${Driver.Username}`}</div>
                                <div className="content-text-secondary">{Dictionary.Driver}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <img src={Trader.PhotoURL ? Trader.PhotoURL : "./images/defaultProfilePhoto.png"} alt="profile_photo.png"
                                    height="34"
                                    width="34"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        margin: "0px",
                                        border: "3px solid #3A3A3C"
                                    }} />
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{`${Trader.FirstName} ${Trader.LastName}`}</div>
                                <div className="content-text-secondary color-default">{`@${Trader.Username}`}</div>
                                <div className="content-text-secondary">{Trader.Type === " Trader" ? Dictionary.Trader : Dictionary.Broker}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Participants: "المشاركين",
        Driver: "سائق",
        Trader: "تاجر",
        Broker: "الوسيط",
    };
}
else {
    Dictionary = {
        Participants: "Participants",
        Driver: "DRIVER",
        Trader: "TRADER",
        Broker: "BROKER",
    };
}

export default UserDetailsContainer;