import React, { Component } from "react";
import ProgressBar from "../../../../../../controls/ProgressBar";
import TruckJobsTable from "./TruckJobsTable";
import SearchTruckJobsDialog from "./SearchTruckJobsDialog";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import { getData } from "../../../../TransportCompanyResponsiblesFunctions";

class TruckJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllTruckJobs: [],
            TruckJobs: [],
            Searching: false,
            ShowingSearchResults: false,
            Refreshing: false
        };

        this.searchTruckJobs = this.searchTruckJobs.bind(this);
    }

    async componentDidMount() {
        this.props.SearchTruckJobs(this.searchTruckJobs);
    }

    searchTruckJobs = async truckNumber => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TruckJobs",
                Params: {
                    TruckNumber: truckNumber
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Truck jobs found.") {
                    this.setState({
                        AllTruckJobs: response.TruckJobs,
                        TruckJobs: response.TruckJobs,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllTruckJobs: [],
                        TruckJobs: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            AllTruckJobs,
            TruckJobs,
            Searching,
            ShowingSearchResults
        } = this.state;

        return (Searching || AllTruckJobs.length === 0) ?
            <section dir={GetDirection()}>
                <div className="jumbotron theme-default" style={{ width: "100%", height: "100vh" }}>
                    <div className="container">
                        {Searching ? <div className="text-center p-xxs">
                            <div className="type-h4 color-default">{Dictionary.Searching}</div>
                            <ProgressBar />
                        </div> : <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-search m-r-xxs m-l-xxs"></span>{Dictionary.NoJobsFound}.</div>
                            </div>}
                    </div>
                </div>
            </section> :
            <section>
                <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                    {ShowingSearchResults ? 
                        <button className="btn btn-secondary m-t-n"
                            onClick={() => {
                                this.setState({
                                    TruckJobs: AllTruckJobs,
                                    ShowingSearchResults: false
                                });
                            }}>{Dictionary.CancelSearch}</button> : 
                        <button className="btn btn-secondary m-t-n"
                            data-toggle="modal"
                            data-target={`#search-truck-jobs-dialog`}>{Dictionary.SearchJobs}</button>}
                </div>

                <SearchTruckJobsDialog TruckJobs={AllTruckJobs}
                    OnOK={truckJobs => {
                        this.setState({
                            TruckJobs: truckJobs,
                            ShowingSearchResults: true
                        });
                    }} />

                {TruckJobs.length === 0 ?
                    <SearchingContainer Searching={false}
                        SearchingFor={Dictionary.TruckJobs} /> :
                    <TruckJobsTable TruckJobs={TruckJobs} />}
            </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Searching: "يبحث",
        NoJobsFound: "لا توجد أوامر العمل , الرجاء البحث ",
        SearchJobs: "بحث بامر العمل",
        CancelSearch: "إلغاء البحث", 
    };
}
else {
    Dictionary = {
        Searching: "Searching",
        NoJobsFound: "No truck jobs to display. Search the truck by number to view its jobs",
        SearchJobs: "Search Jobs",
        CancelSearch: "Cancel Search", 
    };
}

export default TruckJobs;