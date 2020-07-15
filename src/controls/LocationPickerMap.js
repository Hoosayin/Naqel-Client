import React, { useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const geocoder = new window.google.maps.Geocoder;

const GetLocation = (latLng, onLocationGotten) => {
    geocoder.geocode({ "location": latLng }, function (results, status) {
        let place;

        if (status === "OK") {
            place = results[0] ? results[0].formatted_address : "Cannot resolve address.";
        } else {
            place = `Geocoder failed due to: ${status}.`;
        }

        onLocationGotten({
            Lat: latLng.lat,
            Lng: latLng.lng,
            Place: place
        });
    });
};

const Map = props => {
    const {
        Icon,
        OnLocationPicked
    } = props;

    const [Location, SetLocation] = useState(props.Location);
    let MapReference;

    useEffect(() => {
        props.SetMapReference(MapReference);
    });

    return <GoogleMap
        ref={mapReference => MapReference = mapReference}
        defaultCenter={Location ? { lat: Location.Lat, lng: Location.Lng } :
            { lat: 24.630820, lng: 46.728230 }}
        defaultZoom={14}
        options={{ streetViewControl: false }}
        onClick={event => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const latLng = {
                lat: lat,
                lng: lng
            };

            GetLocation(latLng, location => {
                SetLocation(location);
                OnLocationPicked(location);
            });
        }}>

        {Location ? <Marker
            position={{ lat: Location.Lat, lng: Location.Lng }}
            drop={window.google.maps.Animation.DROP}
            draggable={true}
            name="Location"
            icon={{
                url: `./images/${Icon}.svg`,
                scaledSize: new window.google.maps.Size(40, 40)
            }}
            onDragEnd={async coordinates => {
                const lat = parseFloat(coordinates.latLng.lat());
                const lng = parseFloat(coordinates.latLng.lng());

                const latLng = { lat: lat, lng: lng };

                GetLocation(latLng, location => {
                    SetLocation(location);
                    OnLocationPicked(location);
                });
            }}
        /> : null}
    </GoogleMap>;
}

const MapWrapped = withGoogleMap(Map);

const LocationPickerMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            Location={props.Location}
            Icon={props.Icon}
            SetMapReference={props.SetMapReference}
            OnLocationPicked={props.OnLocationPicked} />
    </div>;
}

export default LocationPickerMap;