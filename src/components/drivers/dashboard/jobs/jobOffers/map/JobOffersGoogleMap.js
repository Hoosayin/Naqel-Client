import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Strings from "../../../../../../res/strings";

const JobOfferInfoWindow = props => {
    const { JobOffer } = props;

    return <section>
        <div className="type-h6 color-default p-t-n">{`${JobOffer.JobOfferType} Job Offer`}</div>
        <div className="type-sh9">
            <span className="fas fa-tag color-default m-r-xxxs"></span>
            <span className="color-default">PRICE: </span>{`$${JobOffer.Price}`}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">FROM: </span>{JobOffer.LoadingPlace}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">TO: </span>{JobOffer.UnloadingPlace}</div>
    </section>;
};

const Map = props => {
    const [SelectedJobOffer, SetSelectedJobOffer] = useState(null);

    const {
        Place,
        JobOfferPosts
    } = props;

    const lat = Place ? Place.Lat : 33.784310;
    const lng = Place ? Place.Lng : 72.738780;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 33.784310, lng: 72.738780 }}
        center={{ lat: lat, lng: lng }}
        options={{ streetViewControl: false }}>

        {JobOfferPosts.map(jobOfferPost => (
            <Marker key={jobOfferPost.JobOffer.JobOfferID} position={{ lat: jobOfferPost.JobOffer.LoadingLat, lng: jobOfferPost.JobOffer.LoadingLng }}
                icon={{
                    url: "./images/marker.svg",
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => {
                    SetSelectedJobOffer(jobOfferPost.JobOffer);
                }} />
        ))}

        {SelectedJobOffer && <InfoWindow position={{ lat: SelectedJobOffer.LoadingLat, lng: SelectedJobOffer.LoadingLng }}
            onCloseClick={() => {
                SetSelectedJobOffer(null);
            }}>
            <JobOfferInfoWindow JobOffer={SelectedJobOffer} />
        </InfoWindow>}
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const JobOffersGoogleMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Strings.GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            Place={props.Place}
            JobOfferPosts={props.JobOfferPosts} />
    </div>;
}

export default JobOffersGoogleMap;