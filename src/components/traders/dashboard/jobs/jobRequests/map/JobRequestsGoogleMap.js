import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Strings from "../../../../../../res/strings";

const JobRequestWindow = props => {
    const { JobRequest } = props;

    return <section>
        <div className="type-h6 color-default p-t-n">Job Request</div>
        <div className="type-sh9">
            <span className="fas fa-tag color-default m-r-xxxs"></span>
            <span className="color-default">PRICE: </span>{`$${JobRequest.Price}`}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">FROM: </span>{JobRequest.LoadingPlace}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">TO: </span>{JobRequest.UnloadingPlace}</div>
    </section>;
};

const Map = props => {
    const [SelectedJobRequest, SetSelectedJobRequest] = useState(null);

    const {
        Place,
        JobRequestPosts
    } = props;

    const lat = Place ? Place.Lat : 33.784310;
    const lng = Place ? Place.Lng : 72.738780;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 33.784310, lng: 72.738780 }}
        center={{ lat: lat, lng: lng }}
        options={{ streetViewControl: false }}>

        {JobRequestPosts.map((jobRequestPost, index) => {
            const jobRequest = jobRequestPost.JobRequest;

            return <Marker key={index} position={{ lat: jobRequest.LoadingLat, lng: jobRequest.LoadingLng }}
                icon={{
                    url: "./images/marker.svg",
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => {
                    SetSelectedJobRequest(jobRequest);
                }} />;
        })}
        

        {SelectedJobRequest && <InfoWindow position={{ lat: SelectedJobRequest.LoadingLat, lng: SelectedJobRequest.LoadingLng }}
            onCloseClick={() => {
                SetSelectedJobRequest(null);
            }}>
            <JobRequestWindow JobRequest={SelectedJobRequest} />
        </InfoWindow>}
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const JobRequestsGoogleMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Strings.GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            Place={props.Place}
            JobRequestPosts={props.JobRequestPosts} />
    </div>;
}

export default JobRequestsGoogleMap;