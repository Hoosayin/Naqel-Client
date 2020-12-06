import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobOffersGoogleMap from "./JobOffersGoogleMap";
import { getData } from "../../../../DriverFunctions";
import FirebaseApp from "../../../../../../res/FirebaseApp";

class JobOffersMap extends Component {
    constructor(props) {
        super(props);

        const driverID = jwt_decode(localStorage.Token).DriverID;
        this.Database = FirebaseApp.database().ref()
        .child(`${driverID}`);

        this.state = {
            JobOfferPosts: [],
            Place: null,
            Searching: false,
            Refreshing: false,
            DriverLocation: null,
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
        this.locateDriver = this.locateDriver.bind(this);
    }

    componentDidMount() {
        this.props.Refresh(this.refresh);
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            this.locateDriver();

            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPosts",
                Params: this.state.DriverLocation ? {
                    DriverLat: this.state.DriverLocation.Lat,
                    DriverLng: this.state.DriverLocation.Lng
                } : {
                    DriverLat: null,
                    DriverLng: null,
                }
            };

            this.setState({
                Searching: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Searching: false
                    });
                }
            });
        }
    };

    locateDriver = () => {
        this.Database.once("value", snapshot => {
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
            });
        });
    };

    refresh = () => {
        if (localStorage.Token) {
            this.locateDriver();

            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPosts",
                Params: this.state.DriverLocation ? {
                    DriverLat: this.state.DriverLocation.Lat,
                    DriverLng: this.state.DriverLocation.Lng
                } : {
                    DriverLat: null,
                    DriverLng: null,
                }
            };

            this.setState({
                Refreshing: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Refreshing: false
                    });
                }
            });
        }
    };

    render() {
        const {
            JobOfferPosts,
            Place,
            Searching
        } = this.state;

        return <section>

            {JobOfferPosts.length === 0 ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.JobOffers} /> :
                <section>
                    <JobOffersGoogleMap JobOfferPosts={JobOfferPosts} />
                </section>}
        </section>;
    }
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobOffers: "عروض العمل",
    };
}
else {
    Dictionary = {
        JobOffers: "Job Offers",
    };
}

export default JobOffersMap;