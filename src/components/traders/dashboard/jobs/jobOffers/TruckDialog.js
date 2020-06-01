import React, { Component } from "react";
import TruckContainer from "../../../../../containers/truck/TruckContainer";
import TrailersContainer from "../../../../../containers/truck/TrailersContainer";

class TruckDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Trailers: []
        };
    }

    render() {
        const index = this.props.Index;

        return <section>
            <div className="modal modal-center-vertical" id={`truck-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <section>
                                <ul className="nav nav-tabs tabs-light" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href={`#truck-tab-${index}`} aria-controls={`truck-tab-${index}`} role="tab" data-toggle="tab">Truck</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={`#trailers-tab-${index}`} aria-controls={`trailers-tab-${index}`} role="tab" data-toggle="tab">Trailers</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id={`truck-tab-${index}`}>
                                        <TruckContainer Refresh={this.props.Refresh}
                                            DriverID={this.props.DriverID}
                                            OnTrailersFound={trailers => {
                                                this.setState({
                                                    Trailers: trailers
                                                });
                                            }}
                                            TabView={true} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id={`trailers-tab-${index}`}>
                                        <TrailersContainer Trailers={this.state.Trailers} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default TruckDialog;