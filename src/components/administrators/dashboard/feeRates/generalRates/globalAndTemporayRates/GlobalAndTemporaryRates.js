import React, { Component } from "react";
import ProgressRing from "./../../../../../../controls/ProgressRing";
import { getData } from "../../../../AdministratorFunctions";
import SetGlobalFeeRateDialog from "./SetGlobalFeeRateDialog";
import SetTemporaryFeeRateDialog from "./SetTemporaryFeeRateDialog";
import ClearTemporaryFeeRateDialog from "./ClearTemporaryFeeRateDialog";

class GlobalAndTemporaryRates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            GlobalFeeRate: 0.00,
            TemporaryFeeRateData: null, 
            Searching: false
        }

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "GlobalAndTemporaryFeeRates"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Global and temporary fee rates found.") {
                    this.setState({
                        GlobalFeeRate: response.GlobalFeeRate,
                        TemporaryFeeRateData: response.TemporaryFeeRateData,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        GlobalFeeRate: 0.00,
                        TemporaryFeeRateData: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            GlobalFeeRate,
            TemporaryFeeRateData,
            Searching
        } = this.state;

        const dateUpTo = TemporaryFeeRateData ? new Date(TemporaryFeeRateData.Date) : null;

        return <section>
            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5" }}>
                <div class="row">
                    <div class="col-md-6">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#E5E5E5", color: "#008575" }}>
                                    <span className="fas fa-tag"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Global Fee Rate
                                        {Searching ? <span className="m-l-xxxs"><ProgressRing /></span> : null}
                                    </div>
                                    <div className="content-text-secondary">{GlobalFeeRate ? `${GlobalFeeRate}%` : "Not found."}</div>
                                    <button className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={`#set-global-fee-rate-dialog`}>Set</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#E5E5E5", color: "#008575" }}>
                                    <span className="fas fa-tag"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Temporary Fee Rate
                                        {Searching ? <span className="m-l-xxxs"><ProgressRing /></span> : null}
                                    </div>

                                    {TemporaryFeeRateData ?
                                        <section>
                                            <div className="content-text-secondary">{`${TemporaryFeeRateData.FeeRate}%`}</div>
                                            <div className="content-text-secondary">{`UP TO: ${dateUpTo.toDateString()}`}</div>
                                            <button className="btn btn-danger"
                                                data-toggle="modal"
                                                data-target={`#clear-temporary-fee-rate-dialog`}>Clear</button>
                                        </section> :
                                        <section>
                                            <div className="content-text-secondary">Not found.</div>
                                            <button className="btn btn-primary"
                                                data-toggle="modal"
                                                data-target={`#set-temporary-fee-rate-dialog`}>Set</button>
                                        </section>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SetGlobalFeeRateDialog OnOK={this.onComponentUpdated} />
            <SetTemporaryFeeRateDialog OnOK={this.onComponentUpdated} />
            <ClearTemporaryFeeRateDialog OnOK={this.onComponentUpdated} />
        </section>;
    }
};

export default GlobalAndTemporaryRates;