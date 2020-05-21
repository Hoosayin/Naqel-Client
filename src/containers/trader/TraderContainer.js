import React, { Component } from "react";
import UUID from "uuid-v4";
import SearchingContainer from "../searching/SearchingContainer";
import DocumentsDialog from "./documents/DocumentsDialog";
import { getPublicData } from "../../components/shared/UserFunctions";

class TraderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TraderProfile: null,
            Searching: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.refresh.bind(this);
    }

    async componentDidMount() {
        if (this.props.Refresh) {
            this.props.Refresh(this.refresh);
        }
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Get: "TraderProfile",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader profile found.") {
                    this.setState({
                        TraderProfile: response.TraderProfile,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TraderProfile: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {
            let request = {
                Get: "TraderProfile",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader profile found.") {
                    this.setState({
                        TraderProfile: response.TraderProfile
                    });
                }
                else {
                    this.setState({
                        TraderProfile: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || !this.state.TraderProfile) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor="trader" />;
        }
        else {
            const traderProfile = this.state.TraderProfile;
            const trader = traderProfile.Trader;
            const onJob = traderProfile.OnJob;
            const profilePhoto = traderProfile.ProfilePhoto ?
                traderProfile.ProfilePhoto :
                "./images/defaultProfilePhoto.png";

            const dialogID = UUID().substring(0, 7).toUpperCase();

            return <section>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={profilePhoto} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${trader.FirstName} ${trader.LastName}`}
                                    {onJob ? <span class="badge back-color-golden m-l-xxs">ON JOB</span> : null}
                                </div>
                                <div className="type-sh3">
                                    <span className="fas fa-briefcase" style={{ color: "#606060" }}></span>   {trader.Type}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-globe-asia"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Active</div>
                                                    <div className="content-text-secondary">{(trader.Active === 1) ?
                                                        <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                        <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                                </div>
                                            </div>
                                        </div>
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
                                    </div>
                                    <div className="col-md-12">
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
                                {this.props.TabView ? 
                                    null :
                                    <button type="button" className="btn btn-default"
                                        style={{ minWidth: "152px" }} data-toggle="modal"
                                        data-target={`#documents-dialog-${dialogID}`}>Documents</button>}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.TabView ?
                    null : 
                    <DocumentsDialog DialogID={dialogID}
                        TraderID={this.props.TraderID} />}
            </section>;
        }
    }
};

export default TraderContainer;