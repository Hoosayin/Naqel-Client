import React, { Component } from "react";
import UUID from "uuid-v4";
import Preloader from "../../../../../controls/Preloader";
import ProfileDialog from "./ProfileDialog";
import RequestDialog from "./RequestDialog";
import { toggleSelectTraderRequest } from "../../../DriverFunctions";

class TraderRequestRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onToggleSelect = this.onToggleSelect.bind(this);
    }

    onToggleSelect = async (traderRequestID, isSelected) => {
        this.setState({
            ShowPreloader: true
        });

        const selectedTraderRequest = {
            Token: localStorage.Token,
            TraderRequestID: traderRequestID,
            Selected: isSelected
        };

        console.log(`Going to select Trader request...`);

        await toggleSelectTraderRequest(selectedTraderRequest).then(async response => {
            if (response.Message === "Trader request is toggled.") {

                this.setState({
                    ShowPreloader: false
                });

                await this.props.OnTraderRequestUpdated();
            }
        });
    }

    render() {
        const index = this.props.Index;
        const traderRequestPackage = this.props.TraderRequestPackage;
        const traderRequest = traderRequestPackage.TraderRequest;
        const trader = traderRequestPackage.Trader;
        const traderOnJob = traderRequestPackage.TraderOnJob;
        const requestSelected = this.props.requestSelected;

        const profileIndex = UUID();
        const requestIndex = UUID();

        return <tr>
            {this.state.ShowPreloader ? <Preloader /> : null}
            <td>
                <strong>{index + 1}</strong>
            </td>

            <td>
                {`${trader.FirstName} ${trader.LastName}`}
                {index === 0 ? <span class="badge back-color-golden m-l-xxxs">NEW</span> : null}
                {traderOnJob ? <span class="badge back-color-golden m-l-xxxs">ON JOB</span> : null}
            </td>

            <td>{new Date(traderRequest.Created).toDateString()}</td>

            <td class="text-right">
                <div>
                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#profile-dialog-${profileIndex}`}
                        onMouseDown={async () => {
                            await this.RefreshTraderContainer();
                            await this.RefreshDocumentsContainer();
                        }}>Profile</button>

                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#request-dialog-${requestIndex}`}>Trader Request</button>

                    {traderRequest.Selected ?
                        <button className="btn btn-danger m-xxxs"
                            onClick={async () => { await this.onToggleSelect(traderRequest.TraderRequestID, false); }}>Deselect</button> :
                        <button className="btn btn-primary m-xxxs" disabled={requestSelected}
                            onClick={async () => { await this.onToggleSelect(traderRequest.TraderRequestID, true); }}>Select</button>}

                    <ProfileDialog Index={profileIndex}
                        TraderID={traderRequest.TraderID}
                        RefreshTrader={refresh => { this.RefreshTraderContainer = refresh; }}
                        RefreshDocuments={refresh => { this.RefreshDocumentsContainer = refresh; }} />

                    <RequestDialog Index={requestIndex}
                        TraderRequest={traderRequest} />
                </div>
            </td>
        </tr>;
    }
};

export default TraderRequestRow;