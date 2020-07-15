import React, { Component } from "react";
import { getData } from "../../DriverFunctions.js";
import PermitLicenceListItem from "./PermitLicencesListItem";
import ProgressBar from "../../../../controls/ProgressBar";

class PermitLicencesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllPermitLicences: [],
            PermitLicences: [],
            SearchString: "",
            Searching: null,
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "PermitLicences"
            };

            this.setState({
                Searching: true,
            });

            await getData(request).then(response => {
                if (response.Message === "Permit licences found.") {
                    this.setState({
                        AllPermitLicences: response.PermitLicences,
                        PermitLicences: response.PermitLicences,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllPermitLicences: [],
                        PermitLicences: [],
                        Searching: false
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
                PermitLicences: this.state.AllPermitLicences
            });
        }

        const allPermitLicences = this.state.AllPermitLicences;
        let filteredPermitLicences = [];

        for (var i = 0; i < allPermitLicences.length; i++) {
            if (allPermitLicences[i].Place.includes(this.state.SearchString)) {
                filteredPermitLicences[i] = allPermitLicences[i];
            }
        }

        this.setState({
            PermitLicences: filteredPermitLicences
        });
    }

    render() {
        const permitLicences = this.state.PermitLicences;

        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.PermitLicences}</div>
                <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                                <div className="putbox" style={{ margin: "0px" }}>
                                    <div className="form-group">
                                        <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchByPermitPlace}
                                            style={{ maxWidth: "500px", width: "100%" }} autoComplete="off"
                                            value={this.state.SearchString} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                {(permitLicences.length === 0) ?
                    <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                        <div className="container">
                            <div className="row">
                                {this.state.Searching ? <div className="col-md-24 text-center">
                                    <div>
                                        <div className="type-h3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                        <ProgressBar />
                                    </div>
                                </div> : <div className="col-md-24 text-center">
                                        <h3><span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>{Dictionary.NoLicencesFound}</h3>
                                    </div>}
                            </div>
                        </div>
                    </div> : <ol className="list-items m-n">
                        {this.state.PermitLicences.map((permitLicence, index) => {
                            return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                                <PermitLicenceListItem Index={index}
                                    PermitLicence={permitLicence}
                                    OnPermitLicenceUpdated={async () => { await this.onComponentUpdated() }} />
                            </li>
                        })}
                    </ol>}
                {this.state.Preloader}
            </section>         
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        PermitLicences: "تصاريح التراخيص",
        SearchByPermitPlace: "البحث عن طريق مكان التصريح",
        Searching: "يبحث",
        NoLicencesFound: ".لم يتم العثور على تراخيص",
    };
}
else {
    Dictionary = {
        PermitLicences: "Permit Licences",
        SearchByPermitPlace: "Search by Permit Place",
        Searching: "Searching",
        NoLicencesFound: "No Licences Found.",
    };
}

export default PermitLicencesList;