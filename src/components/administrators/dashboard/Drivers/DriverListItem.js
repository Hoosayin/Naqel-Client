import React, { Component } from "react";
import DriverContainer from "../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../containers/truck/TruckContainer";
import ProgressRing from "../../../../controls/ProgressRing";
import BlockAccountDialog from "./BlockAccountDialog";
import UnblockAccountDialog from "./UnblockAccountDialog";
import { activateDriverAccount } from "../../AdministratorFunctions";

class DriverListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Refreshing: false
        };

        this.onActivateAccount = this.onActivateAccount.bind(this);
    }

    onActivateAccount = async () => {
        this.setState({
            Refreshing: true
        });

        const activatedDriver = {
            Token: localStorage.Token,
            DriverID: this.props.Driver.DriverID
        };

        await activateDriverAccount(activatedDriver).then(async response => {
            this.setState({
                Refreshing: false
            });

            if (response.Message === "Driver account is activated.") {
                this.props.OnAccountActivated(this.props.Driver);
                await this.RefreshDriverContainer();
            }
        });
    }

    render() {
        const {
            Refreshing
        } = this.state;

        const {
            Index,
            Driver
        } = this.props;

        return <section>
            <div className="jumbotron theme-default p-xxs">
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
                                }}/>
                        </div>
                        <div className="item-content-primary">
                            <div className="type-h5 color-default p-t-n">{`${Index + 1}.`}
                                {Refreshing ? <span className="m-l-xxxs"><ProgressRing /></span> : null}
                                {Driver.IsBlocked ? <span class="type-h8 badge back-color-danger m-l-xxxs">BLOCKED</span> : null}
                            </div>
                            <div className="content-text-primary">{`${Driver.FirstName} ${Driver.LastName}`}
                                {Driver.Active ? <span className="fa fa-check-circle m-l-xxxs" style={{ color: "#25AE88" }}></span> : null}
                            </div>
                            <div className="content-text-secondary color-default">{Driver.Username}</div>
                            <div className="content-text-secondary">{Driver.Email}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                {Driver.Active ? null : <button className="btn btn-primary"
                    onClick={this.onActivateAccount}>Activate</button>}

                {Driver.IsBlocked ?
                    <button className="btn btn-secondary"
                        data-toggle="modal"
                        data-target={`#unblock-account-dialog-${Index}`}>Unblock</button> : 
                    <button className="btn btn-danger"
                        data-toggle="modal"
                        data-target={`#block-account-dialog-${Index}`}>Block</button>}
            </div>

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#driver-list-item-${Index}`}>
                <div className="type-h4 color-default text-right p-xxxs">Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`driver-list-item-${Index}`}>
                <ul className="nav nav-tabs tabs-light" role="tablist">
                    <li role="presentation" className="active">
                        <a href={`#driver-${Index}`} aria-controls={`driver-${Index}`} role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshDriverContainer(); }}>Driver</a>
                    </li>
                    <li role="presentation">
                        <a href={`#truck-${Index}`} aria-controls={`truck-${Index}`} role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshTruckContainer(); }}>Truck</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id={`driver-${Index}`}>
                        <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={Driver.DriverID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id={`truck-${Index}`}>
                        <TruckContainer Refresh={refresh => { this.RefreshTruckContainer = refresh; }} DriverID={Driver.DriverID} />
                    </div>
                </div>
            </div>

            {Driver.IsBlocked ?
                <UnblockAccountDialog Index={Index}
                    Driver={Driver}
                    OnOK={() => {
                        this.props.OnAccountBlocked(Driver, false);
                    }} /> :
                <BlockAccountDialog Index={Index}
                    Driver={Driver}
                    OnOK={() => {
                        this.props.OnAccountBlocked(Driver, true);
                    }} />}
        </section>;
    }
};

export default DriverListItem;