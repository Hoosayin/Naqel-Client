import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader.js";
import { getData, deleteJobOffer } from "../../../TraderFunctions.js";
import EditJobOfferDialog from "./EditJobOfferDialog.js";

class JobOffersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllJobOffers: [],
            JobOffers: [],
            EditJobOffersDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobOffer = {
            Token: localStorage.Token,
            JobOfferID: this.state.JobOffers[index].JobOfferID 
        };

        console.log(`Going to delete JobOffers[${index}]...`);

        await deleteJobOffer(discardedJobOffer).then(response => {
            if (response.Message === "Job offer is deleted.") {
                this.onComponentUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOffers"
            };

            getData(request).then(response => {
                if (response.Message === "Job offers found.") {
                    this.setState({
                        AllJobOffers: response.JobOffers,
                        JobOffers: response.JobOffers
                    });
                }
                else {
                    this.setState({
                        AllJobOffers: [],
                        JobOffers: []
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        if (this.state.SearchString === "") {         
            return;
        }
      
        const allJobOffers = this.state.AllJobOffers;
        let filteredJobOffers = [];

        for (var i = 0; i < allJobOffers.length; i++) {
            if (allJobOffers[i].LoadingPlace.includes(this.state.SearchString) ||
                allJobOffers[i].UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobOffers[i] = allJobOffers[i];
            }
        }

        this.setState({
            JobOffers: filteredJobOffers
        });
    }

    render() {
        if (this.state.AllJobOffers.length !== 0) {
            return (
                <section>
                    <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                    <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Your Job Offers</div>
                    <nav class="navbar navbar-default">
                        <div class="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                <form noValidate onSubmit={this.onSearch} class="navbar-form navbar-right" role="search">
                                    <div class="putbox" style={{ margin: "0px" }}>
                                        <div class="form-group">
                                            <input type="search" name="SearchString" class="form-control" placeholder="Search by Places"
                                                style={{ maxWidth: "500px", width: "100%" }}
                                                value={this.state.SearchString} onChange={this.onChange} />
                                        </div>
                                        <button type="submit" class="btn btn-default form-control" style={{ width: "34px" }}></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <ol class="list-items" style={{ margin: "0px" }}>
                        {this.state.JobOffers.map((value, index) => {
                            return <li class="list-items-row">
                                <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.JobOfferID}`}>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <i class="glyph glyph-add"></i>
                                            <i class="glyph glyph-remove"></i>
                                            <strong>{index + 1}</strong>
                                        </div>
                                        <div class="col-md-2">
                                            <img src="./images/job_offers.png" alt="job_offers.png" height="50" />
                                        </div>
                                        <div class="col-md-6">
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Loading Place:</span> {value.LoadingPlace}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Unloading Place:</span> {value.UnloadingPlace}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Trip Type:</span> {value.TripType}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Price:</span> {`$${value.Price}`}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Available:</span> {((Math.abs(new Date() - new Date(value.TimeCreated)) / 36e5) < value.WaitingTime) ?
                                                    <span class="fa fa-check-circle" style={{ fontWeight: "bold", color: "#25AE88" }}></span> :
                                                    <span class="fa fa-times-circle" style={{ fontWeight: "bold", color: "#D75A4A" }}></span>}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: "bold", color: "#404040" }}>Created:</span> {`${(Math.floor((new Date().getTime() - new Date(value.TimeCreated)) / 36e5))} Hour(s) Ago`}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="collapse" id={value.JobOfferID}>
                                    <div class="row">
                                        <div class="col-md-18 col-md-offset-2">
                                        </div>
                                        <div class="col-md-4 text-right">
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                data-toggle="modal"
                                                data-target={`#edit-job-offer-dialog-${index}`}
                                                onMouseDown={() => {
                                                    let editJobOfferDialogs = this.state.EditJobOfferDialogs;

                                                    editJobOfferDialogs[index] = <EditJobOfferDialog
                                                        DialogID={index}
                                                        JobOffer={value}
                                                        OnCancel={() => {
                                                            let editJobOfferDialogs = this.state.EditJobOfferDialogs;
                                                            editJobOfferDialogs[index] = null;

                                                            this.setState({
                                                                EditJobOfferDialogs: editJobOfferDialogs
                                                            });

                                                        }}
                                                        OnOK={cancelButton => {
                                                            cancelButton.click();
                                                            this.onComponentUpdated();
                                                        }} />;

                                                    this.setState({
                                                        EditJobOfferDialogs: editJobOfferDialogs
                                                    });
                                                }}>
                                                Edit
                                            </button>
                                            <button type="button" class="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                {this.state.EditJobOfferDialogs[index]}
                            </li>
                        })}
                    </ol>
                    {this.state.Preloader}
                </section>
            );
        }
        else {
            return null;
        }
    }
};

export default JobOffersList;