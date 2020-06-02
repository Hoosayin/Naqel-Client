import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, } from "react-google-maps";
const Key = "AIzaSyD_U_2NzdPIL7TWb8ECBHWO1eROR2yrebI";

const Map = props => {
    const {
        DriverLocation
    } = props;

    return <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}>

        <Marker key={1} position={{ lat: DriverLocation.Lat, lng: DriverLocation.Lng }}
            icon={{
                url: "./images/truck_marker.svg",
                scaledSize: new window.google.maps.Size(40, 40)
            }} />
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const TruckMap = props => {
    return <div style={{ width: "100%", height: "400px" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Key}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            DriverLocation={props.DriverLocation} />
    </div>;
}

export default TruckMap;