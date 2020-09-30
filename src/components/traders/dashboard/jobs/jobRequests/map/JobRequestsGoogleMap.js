import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Strings from "../../../../../../res/strings";

const JobRequestWindow = props => {
    const { JobRequest } = props;

    return <section>
        <div className="type-h6 color-default p-t-n">{Dictionary.JobRequest}t</div>
        <div className="type-sh9">
            <span className="fas fa-tag color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.Price}: </span>{`${JobRequest.Price} ${Strings.SAUDI_RIYAL}`}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.Source}: </span>{JobRequest.LoadingPlace}</div>
        <div className="type-sh9">
            <span className="fas fa-map-marker-alt color-default m-r-xxxs"></span>
            <span className="color-default">{Dictionary.Destination}: </span>{JobRequest.UnloadingPlace}</div>
    </section>;
};

const Map = props => {
    const [SelectedJobRequest, SetSelectedJobRequest] = useState(null);

    const {
        JobRequestPosts
    } = props;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 24.630820, lng: 46.728230 }}
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

const MapWrapped = withGoogleMap(Map);

const JobRequestsGoogleMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            JobRequestPosts={props.JobRequestPosts} />
    </div>;
}

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobRequest: "طلب وظيفة",
        Price: "السعر",
        Source: "مصدر",
        Destination: "المكان المقصود",
    };
}
else {
    Dictionary = {
        JobRequest: "Job Request",
        Price: "PRICE",
        Source: "SOURCE",
        Destination: "DESTINATION",
    };
}

export default JobRequestsGoogleMap;