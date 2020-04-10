import React, { Component } from "react";

class TraderRequestTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const traderRequest = this.props.TraderRequest;
        const index = this.props.Index;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`Request # ${index + 1}.`}</div>
                        {(index === 0) ? <div className="type-sh3" style={{ color: "#FFBF15" }}>
                            <span className="fas fa-certificate" style={{ color: "#FFBF15" }}></span>   LATEST
                        </div> : null}
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Type</div>
                                        <div className="content-text-secondary">{traderRequest.CargoType}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Weight</div>
                                        <div className="content-text-secondary">{`${traderRequest.CargoWeight} lbs.`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Entry/Exit</div>
                                        <div className="content-text-secondary">{(traderRequest.EntryExit === 1) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Date</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.LoadingDate).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Time</div>
                                        <div className="content-text-secondary">{traderRequest.LoadingTime}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Accpeted Delay</div>
                                        <div className="content-text-secondary">{`${traderRequest.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Requested on</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.Created).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Requested at</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.Created).toTimeString()}</div>
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

export default TraderRequestTab;