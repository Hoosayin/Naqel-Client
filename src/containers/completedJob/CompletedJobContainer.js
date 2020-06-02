import React, { Component } from "react";

class CompletedJobContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const completedJob = this.props.CompletedJob;

        let loadingDate = new Date(completedJob.LoadingDate);
        loadingDate.setHours((parseInt(completedJob.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(completedJob.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(completedJob.LoadingTime.substring(6)));

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                            {index && index >= 0 ? `${index + 1}.` : "Job"}
                            {index === 0 ? <span class="badge back-color-golden m-l-xxs">LATEST</span> : null}
                        </div>
                        <div className="type-sh3">
                            <span className="fas fa-tag m-r-xxs" style={{ color: "#606060" }}></span>{`$${completedJob.Price.toFixed(2)}`}
                        </div>
                        <div className="type-h4" style={{ color: "#008575", paddingTop: "0px" }}>
                            <span className="fas fa-check m-r-xxxs"></span>
                            {`Cargo Items were Delivered at ${completedJob.UnloadingPlace} from ${completedJob.LoadingPlace}.`}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-hashtag"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Job Number</div>
                                        <div className="content-text-secondary">{completedJob.JobNumber}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-signs"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Trip Type</div>
                                        <div className="content-text-secondary">{completedJob.TripType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Accpeted Delay</div>
                                        <div className="content-text-secondary">{`${completedJob.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Entry/Exit</div>
                                        <div className="content-text-secondary">{completedJob.EntryExit ?
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
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Type</div>
                                        <div className="content-text-secondary">{completedJob.CargoType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Weight</div>
                                        <div className="content-text-secondary">{`${completedJob.CargoWeight} lbs.`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Date</div>
                                        <div className="content-text-secondary">{loadingDate.toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Time</div>
                                        <div className="content-text-secondary">{loadingDate.toTimeString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Completed on</div>
                                        <div className="content-text-secondary">{new Date(completedJob.Created).toDateString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Completed at</div>
                                        <div className="content-text-secondary">{new Date(completedJob.Created).toTimeString()}</div>
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

export default CompletedJobContainer;