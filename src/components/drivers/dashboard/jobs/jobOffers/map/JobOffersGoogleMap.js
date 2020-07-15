import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Strings from "../../../../../../res/strings";

const JobOfferInfoWindow = props => {
    const { JobOffer } = props;

    return <section dir={GetDirection()}>
        <div className="type-h6 color-default p-t-n">{`${JobOffer.JobOfferType} ${Dictionary.JobOffer}`}</div>
        <div className="type-sh9">
            <span className="fas fa-tag color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.Price}: </span>{`${JobOffer.Price} ${Strings.SAUDI_RIYAL}`}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.From}: </span>{JobOffer.LoadingPlace}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.To}: </span>{JobOffer.UnloadingPlace}</div>
    </section>;
};

const Map = props => {
    const [SelectedJobOffer, SetSelectedJobOffer] = useState(null);
    let MapReference;

    const {
        JobOfferPosts
    } = props;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 24.630820, lng: 46.728230 }}
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

const MapWrapped = withGoogleMap(Map);

const JobOffersGoogleMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            JobOfferPosts={props.JobOfferPosts} />
    </div>;
}

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobOffer: "عرض عمل",
        Price: "السعر",
        From: "مصدر",
        To: "المكان المقصود",
    };
}
else {
    Dictionary = {
        JobOffer: "Job Offer",
        Price: "PRICE",
        From: "FROM",
        To: "TO",
    };
}

export default JobOffersGoogleMap;