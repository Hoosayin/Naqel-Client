import React, { Component } from "react";
import PlaceInput from "./PlaceInput";
import LocationPickerMap from "./LocationPickerMap";

class LocationPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Location: this.props.Location
        };
    }

    render() {
        const {
            Location
        } = this.state;

        const {
            Label,
            Icon,
            OnLocationPicked
        } = this.props;

        return <section style={{ border: "4px solid #ADADAD" }}>
            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5" }}>
                <div class="row">
                    <div class="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#E5E5E5" }}>
                                    <span><img src={`./images/${Icon}.svg`} alt={`${Icon}.svg`} /></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Label}</div>
                                    <div className="content-text-secondary">{Location.Place}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-xxs back-color-gray">
                <PlaceInput OnPlaceSelected={location => {
                    this.MapReference.panTo(new window.google.maps.LatLng(location.Lat, location.Lng));
                }} />
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#ADADAD" }}></div>

            <LocationPickerMap
                Location={Location}
                Icon={Icon}
                SetMapReference={mapReference => {
                    this.MapReference = mapReference;
                }}
                OnLocationPicked={location => {
                    this.setState({
                        Location: location
                    });

                    OnLocationPicked(location);
                }} />

        </section>;
    }
};

export default LocationPicker;