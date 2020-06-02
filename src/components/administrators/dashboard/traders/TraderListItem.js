import React, { Component } from "react";
import ProgressRing from "../../../../controls/ProgressRing";
import TraderContainer from "../../../../containers/trader/TraderContainer";
import SetRefundRateDialog from "./SetRefundRateDialog";
import ChargeTraderDialog from "./ChargeTraderDialog";
import ExonerateTraderDialog from "./ExonerateTraderDialog";

class TraderListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Refreshing: false
        };
    }

    render() {
        const {
            Refreshing
        } = this.state;

        const {
            Index,
            Trader
        } = this.props;

        return <section>
            <div className="jumbotron theme-default p-xxs">
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
                            <div className="type-h5 color-default p-t-n">{`${Index + 1}.`}
                                {Refreshing ? <span className="m-l-xxxs"><ProgressRing /></span> : null}
                            </div>
                            <div className="content-text-primary">{`${Trader.FirstName} ${Trader.LastName}`}</div>
                            <div className="content-text-secondary color-default">{Trader.Username}</div>
                            <div className="content-text-secondary">{Trader.Email}</div>
                            <div className="content-text-secondary">{Trader.Type}</div>
                            <div className="content-text-secondary">
                                {Trader.TraderRefundRate ?
                                    `Refund Rate: ${Trader.TraderRefundRate.RefundRate}%` :
                                    `Refund Rate: Not Set`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-primary"
                    data-toggle="modal"
                    data-target={`#set-refund-rate-dialog-${Index}`}>Set Refund Rate</button>

                {Trader.IsExonerated ?
                    <button className="btn btn-secondary"
                        data-toggle="modal"
                        data-target={`#charge-trader-dialog-${Index}`}>Charge</button> :
                    <button className="btn btn-danger"
                        data-toggle="modal"
                        data-target={`#exonerate-trader-dialog-${Index}`}>Exonerate</button>}
            </div>

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#trader-list-item-${Index}`}>
                <div className="type-h4 color-default text-right p-xxxs">Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`trader-list-item-${Index}`}>
                <TraderContainer Refresh={refresh => { this.RefreshTraderContainer = refresh; }} TraderID={Trader.TraderID} />
            </div>

            <SetRefundRateDialog Index={Index}
                Trader={Trader}
                OnOK={refundRate => {
                    this.props.OnRefundRateSet(Trader, refundRate);
                }} />

            {Trader.IsExonerated ?
                <ChargeTraderDialog Index={Index}
                    Trader={Trader}
                    OnOK={() => {
                        this.props.OnTraderExonerated(Trader, false);
                    }} /> :
                <ExonerateTraderDialog Index={Index}
                    Trader={Trader}
                    OnOK={() => {
                        this.props.OnTraderExonerated(Trader, true);
                    }} />}
        </section>;
    }
};

export default TraderListItem;