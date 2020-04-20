import React, { Component } from "react";

class JobContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onGoingJob = this.props.OnGoingJob;
        const view = this.props.View;

        let loadingDate = new Date(onGoingJob.LoadingDate);
        loadingDate.setHours((parseInt(onGoingJob.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(onGoingJob.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(onGoingJob.LoadingTime.substring(6)));

        let dateDifference = Math.abs(new Date() - loadingDate);
        const days = Math.floor(dateDifference / 86400000);
        const hours = Math.floor((dateDifference % 86400000) / 3600000);
        const minutes = Math.round(((dateDifference % 86400000) % 3600000) / 60000);

        let dayString = (days > 0) ? `${days} Days ` : "";
        let hourString = (hours > 0) ? `${hours} Hours ` : "";
        let minuteString = (minutes > 0) ? `${minutes} Minutes ` : "";

        let remainingTime = (view === "Driver") ?
            `${dayString}${hourString}${minuteString}Left To Load Cargo` :
            `${dayString}${hourString}${minuteString}Left for Your Driver to Arrive`;

        if (days === 0 && hours === 0 && minutes === 0) {
            remainingTime = "Loading Time has Passed";
        }

        return <section>
            <div class="jumbotron theme-dark" style={{ background: "linear-gradient(to right bottom, #008575, #005162)" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-24 text-center">
                            <h3><span className="fas fa-clock"></span>   {remainingTime}</h3>
                            <div class="type-sh3">
                                <span className="fas fa-tag"></span>{(view === "Driver") ?
                                    `   $${onGoingJob.Price} AMOUNT IS ON YOUR WAY` :
                                    `   YOU PAID $${onGoingJob.Price}`}</div>
                            <div class="col-md-12 col-md-offset-6">
                                <div class="type-p3">{(onGoingJob.AcceptedDelay > 0) ?
                                    <span>
                                        <span className="fas fa-leaf"></span>
                                        <span>{(view === "Driver") ?
                                            ` You have a relaxation of ${onGoingJob.AcceptedDelay} Hours.` :
                                            ` Driver has a relaxation of ${onGoingJob.AcceptedDelay} Hours.`}
                                        </span>
                                    </span> :
                                    <span>{(view === "Driver") ?
                                        "You must reach on time to load the cargo." :
                                        "Hoping for the driver to be on time."}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Job Details</div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Place</div>
                                        <div className="content-text-secondary">{onGoingJob.LoadingPlace}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Unloading Place</div>
                                        <div className="content-text-secondary">{onGoingJob.UnloadingPlace}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-signs"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Trip Type</div>
                                        <div className="content-text-secondary">{onGoingJob.TripType}</div>
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
                                        <div className="content-text-secondary">{`${onGoingJob.AcceptedDelay} Hour(s)`}</div>
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
                                        <div className="content-text-secondary">{onGoingJob.CargoType}</div>
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
                                        <div className="content-text-secondary">{`${onGoingJob.CargoWeight} lbs.`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
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
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Entry/Exit</div>
                                        <div className="content-text-secondary">{(onGoingJob.EntryExit === 1) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Started on</div>
                                        <div className="content-text-secondary">{new Date(onGoingJob.Created).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Started at</div>
                                        <div className="content-text-secondary">{new Date(onGoingJob.Created).toTimeString()}</div>
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

export default JobContainer;