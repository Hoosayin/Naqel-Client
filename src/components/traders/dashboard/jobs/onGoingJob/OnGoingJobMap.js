import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer } from "react-google-maps";
const Key = "AIzaSyD_U_2NzdPIL7TWb8ECBHWO1eROR2yrebI";

const Directions = props => {
    const [Directions, SetDirections] = useState(null);

    const { OnGoingJob } = props;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: OnGoingJob.LoadingLat, lng: OnGoingJob.LoadingLng };
    const destination = { lat: OnGoingJob.UnloadingLat, lng: OnGoingJob.UnloadingLng };

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
            SetDirections(result);
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });

    return <DirectionsRenderer directions={Directions} />;
};

const Map = props => {
    return <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 33.784310, lng: 72.738780 }}>

        <Directions OnGoingJob={props.OnGoingJob} />
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const OnGoingJobMap = props => {
    return <div style={{ width: "100%", height: "400px" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Key}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            OnGoingJob={props.OnGoingJob} />
    </div>;
}

export default OnGoingJobMap;