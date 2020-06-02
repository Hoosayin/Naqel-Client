import React, { Component } from "react";
import firebase from "firebase";
import FirebaseConfiguration from "../../../../../res/FirebaseConfiguration";
import TruckMap from "./TruckMap";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";

class LocateTruckDialog extends Component {
    constructor(props) {
        super(props);

        this.FirebaseApp = firebase.initializeApp(FirebaseConfiguration);
        this.Database = this.FirebaseApp.database().ref().child(`${this.props.DriverID}`);

        this.state = {
            DriverLocation: null,
            Searching: false
        };

        this.locateTruck = this.locateTruck.bind(this);
    }

    componentDidMount() {
        this.props.LocateTruck(this.locateTruck);
    }

    locateTruck = () => {
        this.setState({
            Searching: true
        });

        this.Database.on("value", snapshot => {
            let driverLocation = null;
            const value = snapshot.val();

            if (value) {
                const locationCoordinates = value["latlong"].split(",");

                driverLocation = {
                    Lat: parseFloat(locationCoordinates[0]),
                    Lng: parseFloat(locationCoordinates[1])
                };
            }

            this.setState({
                DriverLocation: driverLocation,
                Searching: false
            });
        });
    };

    render() {
        const {
            DriverLocation,
            Searching
        } = this.state;

        const {
            Index
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`locate-truck-dialog-${Index}`}
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
                            {Searching || !DriverLocation ?
                                <SearchingContainer Searching={Searching}
                                    SearchingFor="truck location" /> :
                                <TruckMap DriverLocation={DriverLocation} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default LocateTruckDialog;