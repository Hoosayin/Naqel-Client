import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import { updateTruckPhoto } from "../../DriverFunctions";
import jwt_decode from "jwt-decode";
import TruckSettings from "./TruckSettings";
import AddTrailer from "./trailers/AddTrailer";
import TrailersList from "./trailers/TrailersList";

class Truck extends Component {
    constructor() {
        super();
        this.state = {
            PlateNumber: "",
            Owner: "",
            ProductionYear: "",
            Brand: "",
            Model: "",
            Type: "",
            MaximumWeight: "",
            PhotoURL: "./images/default_image.png",
            AddTrailer: null,
            TrailersList: null,
        };

        this.onInvalidImageSelected = this.onInvalidImageSelected.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
        this.onTrailersUpdated = this.onTrailersUpdated.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const truck = jwt_decode(localStorage.userToken).Truck;

            this.setState({
                PlateNumber: truck.PlateNumber,
                Owner: truck.Owner,
                ProductionYear: truck.ProductionYear,
                Brand: truck.Brand,
                Model: truck.Model,
                Type: truck.Type,
                MaximumWeight: truck.MaximumWeight,
                PhotoURL: truck.PhotoURL,
            });

            if (truck.Trailers.length < 2) {
                this.setState({
                    AddTrailer: <AddTrailer OnTruckUpdated={this.props.OnTruckUpdated} />
                });
            }

            if (truck.Trailers.length > 0) {
                this.setState({
                    TrailersList: <TrailersList OnTrailersUpdated={this.onTrailersUpdated} />
                });
            }
        }
        else {
            this.setState({
                PlateNumber: "",
                Owner: "",
                ProductionYear: "",
                Brand: "",
                Model: "",
                Type: "",
                MaximumWeight: "",
                PhotoURL: "./images/default_image.png",
                AddTrailer: null,
                TrailersList: null,
            });
        }
    }

    onInvalidImageSelected = () => {
        // Nothing to do here.
    }

    onImageUploaded = async response => {
        if (response.message === "Image uploaded successfully.") {
            const updatedTruck = {
                Token: localStorage.getItem("userToken"),
                PhotoURL: response.imageUrl
            }

            await updateTruckPhoto(updatedTruck).then(response => {
                if (response.Message === "Truck photo updated.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnTruckUpdated();
                }
            });
        }
    }

    onTrailersUpdated = () => {
        const trailers = jwt_decode(localStorage.userToken).Truck.Trailers;

        this.setState({
            AddTrailer: null,
            TrailersList: null,
        });

        if (trailers.length < 2) {
            this.setState({
                AddTrailer: <AddTrailer OnTruckUpdated={this.props.OnTruckUpdated} />
            });
        }

        if (trailers.length > 0) {
            this.setState({
                TrailersList: <TrailersList OnTrailerDeleted={this.onTrailerDeleted} />
            });
        }
    }

    render() {
        return (
            <div>
                <div class="jumbotron theme-default">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <ImageUploader Source={this.state.PhotoURL} Height="200px"
                                    Width="200px" OnImageUploaded={this.onImageUploaded} OnInvalidImageSelected={this.onInvalidImageSelected} ImageCategory="Truck" />
                            </div>
                            <div class="col-md-18">
                                <div class="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${this.state.Brand} ${this.state.Model}`}
                                </div>
                                <div class="type-sh3">
                                    <span class="fas fa-truck"></span>   {this.state.Type}
                                    </div>
                                <div>
                                    <ol class="list-items theme-alt">
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-list-ol" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Plate Number:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {this.state.PlateNumber}
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-calendar-day" style={{ color: "#008575", }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Production Year:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {this.state.ProductionYear}
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-weight" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Maximum Weight:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {`${this.state.MaximumWeight} GVW`}
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TruckSettings OnTruckSettingsUpdated={this.props.OnTruckUpdated} />
                {this.state.AddTrailer}
                {this.state.TrailersList}
            </div>
        );
    }
};

export default Truck;