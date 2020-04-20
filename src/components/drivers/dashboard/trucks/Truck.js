import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import { getData, updateTruckPhoto } from "../../DriverFunctions";
import TruckSettings from "./TruckSettings";
import AddTruckDialog from "./AddTruckDialog";
import Trailers from "./trailers/Trailers";
import Preloader from "../../../../controls/Preloader";
import PageHeading from "../../../../controls/PageHeading";

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
            TruckFound: false,
            AddTruckDialog: null,
            AddTrailer: null,
            TrailersList: null,
            Preloader: null
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Truck"
            };

            this.setState({
                Preloader: <Preloader />
            });

            getData(request).then(response => {
                if (response.Message === "Truck found.") {
                    let truck = response.Truck;

                    this.setState({
                        PlateNumber: truck.PlateNumber,
                        Owner: truck.Owner,
                        ProductionYear: truck.ProductionYear,
                        Brand: truck.Brand,
                        Model: truck.Model,
                        Type: truck.Type,
                        MaximumWeight: truck.MaximumWeight,
                        PhotoURL: truck.PhotoURL,
                        TruckFound: true,
                        Preloader: null
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
                        TruckFound: false,
                        Preloader: null
                    });
                }
            });
        }
    };

    render() {
        return <section>
            <PageHeading Heading="TRUCKS" />
            {this.state.TruckFound ? 
                <section>
                    <div className="jumbotron theme-default">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <ImageUploader Source={this.state.PhotoURL}
                                        Height="200px" Width="200px"
                                        OnImageUploaded={async response => {
                                            if (response.message === "Image uploaded successfully.") {
                                                const updatedTruck = {
                                                    Token: localStorage.Token,
                                                    PhotoURL: response.imageUrl
                                                };

                                                await updateTruckPhoto(updatedTruck).then(response => {
                                                    if (response.Message === "Truck photo updated.") {
                                                        this.setState({
                                                            PhotoURL: updatedTruck.PhotoURL
                                                        });
                                                    }
                                                });
                                            }
                                        }}
                                        OnInvalidImageSelected={() => {
                                            return;
                                        }}
                                        ImageCategory="Truck" />
                                </div>
                                <div className="col-md-18">
                                    <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                        {`${this.state.Brand} ${this.state.Model}`}
                                    </div>
                                    <div className="type-sh3">
                                        <span className="fas fa-truck" style={{ color: "#606060" }}></span>   {this.state.Type}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-list-ol"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">Plate Number</div>
                                                        <div className="content-text-secondary">{this.state.PlateNumber}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-calendar-day"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">Production Year</div>
                                                        <div className="content-text-secondary">{this.state.ProductionYear}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-weight"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">Maximum Weight</div>
                                                        <div className="content-text-secondary">{`${this.state.MaximumWeight} GVW`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-24">
                                            <button type="button" className="btn btn-danger">Delete Truck</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TruckSettings OnTruckSettingsUpdated={this.onComponentUpdated} />
                    <Trailers />
                    {this.state.Preloader}
                </section> :
                <section>
                    <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-md-push-12 text-center">
                                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                        alt="add_truck.png" src="./images/add_truck.png" data-source-index="2" />
                                </div>
                                <div className="col-md-12 col-md-pull-12">
                                    <div className="type-h3">Truck</div>
                                    <div className="type-sh3">You have not added any truck yet.</div>
                                    <p>Adding your truck will let the Traders or Brokers see details about your it. Valid and complete details of your truck make more chances for you to receive job requests.</p>
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{ minWidth: "152px" }}
                                            data-toggle="modal"
                                            data-target="#add-truck-dialog"
                                            onMouseDown={() => {
                                                this.setState({
                                                    AddTruckDialog: <AddTruckDialog
                                                        OnCancel={() => {
                                                            this.setState({
                                                                AddTruckDialog: null,
                                                            });
                                                        }}
                                                        OnOK={cancelButton => {
                                                            cancelButton.click();
                                                            this.onComponentUpdated();
                                                        }} />
                                                });
                                            }}>
                                            <span className="fas fa-plus" aria-hidden="true"></span>Add Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.AddTruckDialog}
                    {this.state.Preloader}
                </section>}
        </section>;
    }
};

export default Truck;