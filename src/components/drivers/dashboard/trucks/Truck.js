import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import { getData, updateTruckPhoto, deleteTruck } from "../../DriverFunctions";
import TruckSettings from "./TruckSettings";
import AddTruckDialog from "./AddTruckDialog";
import Trailers from "./trailers/Trailers";
import Preloader from "../../../../controls/Preloader";
import PageHeading from "../../../../controls/PageHeading";

class Truck extends Component {
    constructor() {
        super();
        this.state = {
            Truck: null,
            ShowPreloader: false
        };

        this.onDelete = this.onDelete.bind(this);
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
                    this.setState({
                        Truck: response.Truck,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        Truck: null,
                        Preloader: null
                    });
                }
            });
        }
    };

    onDelete = async () => {
        this.setState({
            ShowPreloader: true
        });

        const discardedTruck = {
            Token: localStorage.Token
        };

        console.log(`Going to delete truck...`);

        await deleteTruck(discardedTruck).then(async response => {
            if (response.Message === "Truck is deleted.") {
                this.setState({
                    ShowPreloader: false
                });

                await this.onComponentUpdated();
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        const truck = this.state.Truck;
        const showPreloader = this.state.ShowPreloader;

        return <section>
            <PageHeading Heading="TRUCKS" />
            {truck ? 
                <section>
                    <div className="jumbotron theme-default">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <ImageUploader Source={truck.PhotoURL}
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
                                    <div className="type-h3 color-default p-t-n">
                                        {`${truck.Brand} ${truck.Model}`}
                                    </div>
                                    <div className="type-sh3">
                                        <span className="fas fa-truck m-r-xxs" style={{ color: "#606060" }}></span>{truck.Type}
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
                                                        <div className="content-text-secondary">{truck.PlateNumber}</div>
                                                    </div>
                                                </div>
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-calendar-day"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">Production Year</div>
                                                        <div className="content-text-secondary">{truck.ProductionYear}</div>
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
                                                        <div className="content-text-secondary">{`${truck.MaximumWeight} GVW`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-24">
                                            <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Truck</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TruckSettings OnTruckSettingsUpdated={this.onComponentUpdated} />
                    <Trailers />
                    {showPreloader ? <Preloader /> : null}
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
                                        <button className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target="#add-truck-dialog">Add Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddTruckDialog OnOK={this.onComponentUpdated} />
                    {showPreloader ? <Preloader /> : null}
                </section>}
        </section>;
    }
};

export default Truck;