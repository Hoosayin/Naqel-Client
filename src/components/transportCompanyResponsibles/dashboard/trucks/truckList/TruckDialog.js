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
        const {
            Trailers
        } = this.state;

        const {
            Index,
            DriverID
        } = this.props;

        const index = this.props.Index;

        return <section>
            <div className="modal modal-center-vertical" id={`truck-dialog-${Index}`}
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
                                        <a href={`#truck-tab-${Index}`} aria-controls={`truck-tab-${Index}`} role="tab" data-toggle="tab">{Dictionary.Truck}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={`#trailers-tab-${Index}`} aria-controls={`trailers-tab-${Index}`} role="tab" data-toggle="tab">{Dictionary.Trailers}</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id={`truck-tab-${index}`}>
                                        <TruckContainer Refresh={this.props.Refresh}
                                            DriverID={DriverID}
                                            OnTrailersFound={trailers => {
                                                this.setState({
                                                    Trailers: trailers
                                                });
                                            }}
                                            TabView={true} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id={`trailers-tab-${index}`}>
                                        <TrailersContainer Trailers={Trailers} />
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Truck: "شاحنة",
        Trailers: "المقطورات"
    };
}
else {
    Dictionary = {
        Truck: "Truck",
        Trailers: "Trailers"
    };
}

export default TruckDialog;