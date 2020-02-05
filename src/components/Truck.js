import React, { Component } from "react";
import ImageUploader from "./ImageUploader";
import { updateTruckPhoto } from "./DriverFunctions";
import jwt_decode from "jwt-decode";
import TruckSettings from "./TruckSettings";

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
        };

        this.onInvalidImageSelected = this.onInvalidImageSelected.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
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
                                    <span class="fa fa-truck"></span>   {this.state.Type}
                                    </div>
                                <div>
                                    <ol class="list-items theme-alt">
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fa fa-list-ol" style={{ color: "#008575" }}></span></strong>
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
                                                    <strong><span class="fa fa-calendar-day" style={{ color: "#008575", }}></span></strong>
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
                                                    <strong><span class="fa fa-weight" style={{ color: "#008575" }}></span></strong>
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
                <div class="jumbotron theme-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-24 text-center">
                                <h3>Trailers</h3>
                                <div class="type-sh3">Your Truck is All Set Up</div>
                                <div class="col-md-12 col-md-offset-6">
                                    <div class="type-p3">RECOMMENDED: Since your truck is all set up, you're good to go for adding trailers to it. You can add at most two trailers for your truck.</div>
                                    <div class="btn-group">
                                        <button class="btn btn-secondary" href="#">Add Trailer</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Truck;