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
            EditJobOfferDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobOffer = {
            Token: localStorage.Token,
            JobOfferID: this.state.JobOffers[index].JobOfferID 
        };

        console.log(`Going to delete JobOffers[${index}]...`);

        deleteJobOffer(discardedJobOffer).then(response => {
            console.log(response);
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

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOffers"
            };

            await getData(request).then(response => {
                if (response.Message === "Job offers found.") {
                    console.log(response);
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
            this.setState({
                JobOffers: this.state.AllJobOffers
            });
            console.log("AFTER SETTING STATE...");
        }
      
        const allJobOffers = this.state.AllJobOffers;
        let filteredJobOffers = [];

        for (var i = 0; i < allJobOffers.length; i++) {
            if (allJobOffers[i].LoadingPlace.includes(this.state.SearchString) ||
                allJobOffers[i].UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobOffers[i] = allJobOffers[i];
            }
        }

        console.log(filteredJobOffers);

        this.setState({
            JobOffers: filteredJobOffers
        });
    }

    render() {
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Your Job Offers</div>
                <nav className="navbar navbar-default">
                    <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                                <div className="putbox" style={{ margin: "0px" }}>
                                    <div className="form-group">
                                        <input type="search" name="SearchString" className="form-control" placeholder="Search by Places"
                                            autoComplete="off"
                                            style={{ maxWidth: "500px", width: "100%" }}
                                            value={this.state.SearchString} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <ol className="list-items" style={{ margin: "0px" }}>
                    {this.state.JobOffers.map((jobOffer, index) => {
                        const hoursSinceCreated = Math.abs(new Date() - new Date(jobOffer.TimeCreated)) / 36e5;

                        return <li className="list-items-row" key={index}>
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#${jobOffer.JobOfferID}`}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <i className="glyph glyph-add"></i>
                                        <i className="glyph glyph-remove"></i>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div className="col-md-2">
                                        <img src="./images/job_offers.png" alt="job_offers.png" height="50" />
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-map-marker-alt" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Loading Place:</span> {jobOffer.LoadingPlace}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-map-marker-alt" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Unloading Place:</span> {jobOffer.UnloadingPlace}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-map-signs" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Trip Type:</span> {jobOffer.TripType}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-tag" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Price:</span> {`$${jobOffer.Price}`}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-clock" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Accepted Delay:</span> {`${jobOffer.AcceptedDelay} Hour(s)`}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-box" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Cargo Type:</span> {jobOffer.CargoType}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-weight" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Cargo Weight:</span> {`${jobOffer.CargoWeight} lbs.`}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Loading Date:</span> {jobOffer.LoadingDate}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-clock" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Loading Time:</span> {jobOffer.LoadingTime}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-hand-holding-usd" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Offer Type:</span> {jobOffer.JobOfferType}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-id-badge" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Entry/Exit:</span> {(jobOffer.EntryExit === 1) ?
                                                <span className="fa fa-check-circle" style={{ fontWeight: "bold", color: "#25AE88" }}></span> :
                                                <span className="fa fa-times-circle" style={{ fontWeight: "bold", color: "#D75A4A" }}></span>}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-plug" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Available:</span> {(hoursSinceCreated < jobOffer.WaitingTime) ?
                                                <span className="fa fa-check-circle" style={{ fontWeight: "bold", color: "#25AE88" }}></span> :
                                                <span className="fa fa-times-circle" style={{ fontWeight: "bold", color: "#D75A4A" }}></span>}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-clock" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Created:</span> {`${(Math.floor(hoursSinceCreated))} Hour(s) Ago`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="collapse" id={jobOffer.JobOfferID}>
                                <div className="row">
                                    <div className="col-md-18 col-md-offset-2">
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target={`#edit-job-offer-dialog-${index}`}
                                            onMouseDown={() => {
                                                let editJobOfferDialogs = this.state.EditJobOfferDialogs;

                                                editJobOfferDialogs[index] = <EditJobOfferDialog
                                                    DialogID={index}
                                                    JobOffer={jobOffer}
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
                                        <button type="button" className="btn btn-danger" onClick={async () => { await this.onDelete(index); }}>Delete</button>
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
};

export default JobOffersList;