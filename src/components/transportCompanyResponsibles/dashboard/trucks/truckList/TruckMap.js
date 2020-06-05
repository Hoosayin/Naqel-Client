import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, } from "react-google-maps";
import Strings from "../../../../../res/strings";

const Map = props => {
    const {
        DriverLocation
    } = props;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}
        center={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}
        options={{ streetViewControl: false }}>

        <Marker key={1} position={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}
            icon={{
                url: "./images/truck_marker.svg",
                scaledSize: new window.google.maps.Size(40, 40)
            }} />
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const TruckMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Strings.GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            DriverLocation={props.DriverLocation} />
    </div>;
}

export default TruckMap;