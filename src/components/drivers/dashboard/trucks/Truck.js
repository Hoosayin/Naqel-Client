import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import { getData, updateTruckPhoto, deleteTruck } from "../../DriverFunctions";
import TruckSettings from "./TruckSettings";
import AddTruckDialog from "./AddTruckDialog";
import Trailers from "./trailers/Trailers";
import Preloader from "../../../../controls/Preloader";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";

class Truck extends Component {
    constructor() {
        super();
        this.state = {
            Truck: null,
            Searching: false,
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
                Preloader: <Preloader />,
                Searching: true,
            });

            getData(request).then(response => {
                if (response.Message === "Truck found.") {
                    this.setState({
                        Truck: response.Truck,
                        Preloader: null,
                        Searching: false,
                    });
                }
                else {
                    this.setState({
                        Truck: null,
                        Preloader: null,
                        Searching: false,
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

        if (this.state.Searching)
        {
            return <SearchingContainer Searching={this.state.Searching}
            SearchingFor={Dictionary.Truck} />;
        }
        else
        {
            return <section>
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

                                                let photoURL = response.imageUrl;

                                                await updateTruckPhoto(updatedTruck).then(response => {
                                                    if (response.Message === "Truck photo updated.") {
                                                        let {
                                                            Truck 
                                                        } = this.state;

                                                        Truck.PhotoURL = photoURL;

                                                        this.setState({
                                                            Truck: Truck
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
                                                        <div className="content-text-primary">{Dictionary.PlateNumber}</div>
                                                        <div className="content-text-secondary">{truck.PlateNumber}</div>
                                                    </div>
                                                </div>
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-calendar-day"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.ProductionYear}</div>
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
                                                        <div className="content-text-primary">{Dictionary.MaximumWeight}</div>
                                                        <div className="content-text-secondary">{`${truck.MaximumWeight} KG`}</div>
                                                    </div>
                                                </div>
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-copyright"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.Owner}</div>
                                                        <div className="content-text-secondary">{truck.Owner}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-24">
                                            <button type="button" className="btn btn-danger"
                                                data-toggle="modal"
                                                data-target="#delete-truck-dialog">{Dictionary.DeleteTruck}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TruckSettings OnTruckSettingsUpdated={this.onComponentUpdated} />
                    <Trailers />

                    <div className="modal modal-center-vertical" id="delete-truck-dialog"
                        tabIndex="-1" role="dialog"
                        aria-labelledby="modal-sample-label" aria-hidden="true">
                        <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                            <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                                <div className="modal-header">
                                    <div className="text-right">
                                        <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                            data-dismiss="modal"
                                            ref={cancelButton => this.cancelButton = cancelButton}>
                                            <span className="fas fa-times"></span>
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="jumbotron theme-default" dir={GetDirection()}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-24">
                                                    <div className="type-sh3 m-b-xxs">{Dictionary.DeleteMessage}</div>
                                                </div>
                                                <div className="text-right">
                                                    <button className="btn btn-danger"
                                                        onClick={async () => {
                                                            this.cancelButton.click();
                                                            await this.onDelete();
                                                        }}>{Dictionary.Delete}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showPreloader ? <Preloader /> : null}
                </section> :
                <section>
                    <div className="jumbotron theme-alt" style={{ width: "100%", height: "100vh", backgroundColor: "#333333" }} dir={GetDirection()}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-md-push-12 text-center">
                                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                        alt="add_truck.png" src="./images/delivery.svg" data-source-index="2" />
                                </div>
                                <div className="col-md-12 col-md-pull-12">
                                    <div className="type-h3">{Dictionary.Truck}</div>
                                    <div className="type-sh3">{Dictionary.TruckSubtitle}</div>
                                    <p>{Dictionary.TruckDetails}</p>
                                    <p>{Dictionary.Tip}</p>
                                    <div className="btn-group">
                                        <button className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target="#add-truck-dialog">{Dictionary.AddNow}</button>
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
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        PlateNumber: "رقم لوحة",
        Owner: "صاحب",
        ProductionYear: "سنة الإنتاج",
        MaximumWeight: "الوزن الأقصى",
        DeleteTruck: "حذف الشاحنة",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف هذه الشاحنة؟",
        Truck: "شاحنة",
        TruckSubtitle: ".لم تقم بإضافة أي شاحنة حتى الآن",
        TruckDetails: ".ستؤدي إضافة شاحنتك إلى السماح للمتداولين أو الوسطاء بالاطلاع على التفاصيل المتعلقة بها. توفر التفاصيل الصحيحة والكاملة لشاحنتك فرصًا أكبر لتلقي طلبات العمل",
        Tip: ".نصيحة: يجب أن تمتلك شاحنة من إحدى شركات النقل المسجلة في شركة نقل. لهذا السبب ، يجب أن تعرف اسم مستخدم مسؤول شركة النقل قبل إضافة الشاحنة",
        AddNow: "إضافة الآن"
    };
}
else {
    Dictionary = {
        PlateNumber: "Plate Number",
        Owner: "Owner",
        ProductionYear: "Production Year",
        MaximumWeight: "Maximum Weight",
        DeleteTruck: "Delete Truck",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this truck?",
        Truck: "Truck",
        TruckSubtitle: "You have not added any truck yet.",
        TruckDetails: "Adding your truck will let the Traders or Brokers see details about your it. Valid and complete details of your truck make more chances for you to receive job requests.",
        Tip: "TIP: You must possess a truck from one of the transport companies registered on Naqel. For this reason, you must know Transport Company Responsible's username before you add the truck.",
        AddNow: "Add Now"
    };
}

export default Truck;