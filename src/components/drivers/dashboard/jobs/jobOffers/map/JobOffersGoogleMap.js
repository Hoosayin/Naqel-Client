import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
const Key = "AIzaSyD_U_2NzdPIL7TWb8ECBHWO1eROR2yrebI";

const JobOfferWindow = props => {
    const { JobOffer } = props;

    return <section>
        <div className="jumbotron theme-default" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="container">
                <div className="col-md-24">
                    <div className="type-h6 color-default p-t-n">{`${JobOffer.JobOfferType} Job Offer`}</div>
                    <div className="type-sh6">
                        <span className="fas fa-tag color-default m-r-xxxs"></span>
                        <span className="color-default">PRICE: </span>{`$${JobOffer.Price}`}</div>
                    <div className="type-sh6">
                        <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
                        <span className="color-default">FROM: </span>{JobOffer.LoadingPlace}</div>
                    <div className="type-sh6">
                        <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
                        <span className="color-default">TO: </span>{JobOffer.UnloadingPlace}</div>
                </div>
            </div>
        </div>
    </section>;
};

const Map = props => {
    console.log(props.Place);
    const [SelectedJobOffer, SetSelectedJobOffer] = useState(null);

    const {
        Place,
        JobOfferPosts
    } = props;

    const lat = Place ? Place.Lat : 33.784310;
    const lng = Place ? Place.Lng : 72.738780;

    return <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 33.784310, lng: 72.738780 }}
        center={{ lat: lat, lng: lng }}>

        {JobOfferPosts.map((jobOfferPost, index) => {
            const jobOffer = jobOfferPost.JobOffer;

            return <Marker key={index} position={{ lat: jobOffer.LoadingLat, lng: jobOffer.LoadingLng }}
                icon={{
                    url: "./images/marker.svg",
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => {
                    SetSelectedJobOffer(jobOffer);
                }} />;
        })}
        

        {SelectedJobOffer ? <InfoWindow position={{ lat: SelectedJobOffer.LoadingLat, lng: SelectedJobOffer.LoadingLng }}
            onCloseClick={() => {
                SetSelectedJobOffer(null);
            }}>
            <JobOfferWindow JobOffer={SelectedJobOffer} />
        </InfoWindow> : null}
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const JobOffersGoogleMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Key}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            Place={props.Place}
            JobOfferPosts={props.JobOfferPosts} />
    </div>;
}

export default JobOffersGoogleMap;