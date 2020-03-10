import React, { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey("AIzaSyC3YT8gMjGGdzQpHBNcayZYF4rvbGTL8IM");
Geocode.enableDebug();

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NoState: null
        };
    }

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3YT8gMjGGdzQpHBNcayZYF4rvbGTL8IM&libraries=places"
                        defaultZoom={10}
                        defaultCenter={{ lat: 33.784310, lng: 72.738780 }}>                   
                    </GoogleMap>
                )
            )
        );
        return (
            <div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3YT8gMjGGdzQpHBNcayZYF4rvbGTL8IM&libraries=places"
                    loadingElement={ <div style={{ height: `100%` }} /> }
                    containerElement={ <div style={{ height: "400px" }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> } />
            </div>              
        );
    }
};

export default Map;