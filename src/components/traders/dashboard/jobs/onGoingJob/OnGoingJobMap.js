import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import Strings from "../../../../../res/strings";

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

    return <DirectionsRenderer directions={Directions} options={{
        suppressMarkers: true
    }} />;
};

const Map = props => {
    const {
        OnGoingJob,
        DriverLocation
    } = props;

    return <GoogleMap>
        <Marker position={{ lat: OnGoingJob.LoadingLat, lng: OnGoingJob.LoadingLng }}
            icon={{
                url: "./images/source.svg",
                scaledSize: new window.google.maps.Size(30, 30)
            }} />

        <Marker position={{ lat: OnGoingJob.UnloadingLat, lng: OnGoingJob.UnloadingLng }}
            icon={{
                url: "./images/destination.svg",
                scaledSize: new window.google.maps.Size(30, 30)
            }} />

        {DriverLocation ?
            <Marker position={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}
                icon={{
                    url: "./images/driver_marker.svg",
                    scaledSize: new window.google.maps.Size(40, 40)
                }} /> : null}

        <Directions OnGoingJob={OnGoingJob} />
    </GoogleMap>;
}

const MapWrapped = withGoogleMap(Map);

const OnGoingJobMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            OnGoingJob={props.OnGoingJob}
            DriverLocation={props.DriverLocation} />
    </div>;
}

export default OnGoingJobMap;