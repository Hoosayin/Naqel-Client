import React, { Component } from "react";
import { getData, deletePermitLicence } from "../../DriverFunctions.js";
import EditPermitLicenceDialog from "./EditPermitLicenceDialog.js";
import Preloader from "../../../../controls/Preloader.js";

class PermitLicencesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllPermitLicences: [],
            PermitLicences: [],
            EditPermitLicenceDialogs: [],
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

        const discardedPermitLicence = {
            Token: localStorage.Token,
            PermitLicenceID: this.state.PermitLicences[index].PermitLicenceID 
        };

        console.log(`Going to delete PermitLicences[${index}]`);

        await deletePermitLicence(discardedPermitLicence).then(response => {
            if (response.Message === "Permit Licence is deleted.") {
                this.props.OnPermitLicencesUpdated();
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
                Get: "PermitLicences"
            };

            await getData(request).then(response => {
                if (response.Message === "Permit Licences found.") {
                    this.setState({
                        AllPermitLicences: response.PermitLicences,
                        PermitLicences: response.PermitLicences
                    });
                }
                else {
                    this.setState({
                        AllPermitLicences: [],
                        PermitLicences: []
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
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Permit Licences</div>
                <nav className="navbar navbar-default">
                    <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                                <div className="putbox" style={{ margin: "0px" }}>
                                    <div className="form-group">
                                        <input type="search" name="SearchString" className="form-control" placeholder="Search by Permit Place"
                                            style={{ maxWidth: "500px", width: "100%" }} autoComplete="off"
                                            value={this.state.SearchString} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <ol className="list-items" style={{ margin: "0px" }}>
                    {this.state.PermitLicences.map((value, index) => {
                        return <li key={index} className="list-items-row">
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.PermitLicenceID}`}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <i className="glyph glyph-add"></i>
                                        <i className="glyph glyph-remove"></i>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                            src={value.PhotoURL} alt="permit.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-hastag" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Permit Number:</span> {value.PermitNumber}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Expiry Date:</span> {value.ExpiryDate}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-asterisk" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Permit Code:</span> {value.Code}
                                        </div>
                                        <div style={{ padding: "3px 0px 3px 0px" }}>
                                            <span className="fas fa-map-marker-alt" style={{ color: "#606060" }}></span>
                                            <span style={{ fontWeight: "bold", color: "#606060" }}>Permit Place:</span> {value.Place}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="collapse" id={value.PermitLicenceID}>
                                <div className="row">
                                    <div className="col-md-18 col-md-offset-2">
                                        <img className="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                            src={value.PhotoURL} alt="permit.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target={`#edit-permit-dialog${index}`}
                                            onMouseDown={() => {
                                                let editPermitLicenceDialogs = this.state.EditPermitLicenceDialogs;

                                                editPermitLicenceDialogs[index] = <EditPermitLicenceDialog
                                                    DialogID={index}
                                                    PermitLicence={value}
                                                    OnCancel={() => {
                                                        let editPermitLicenceDialogs = this.state.EditPermitLicenceDialogs;
                                                        editPermitLicenceDialogs[index] = null;

                                                        this.setState({
                                                            EditPermitLicenceDialogs: editPermitLicenceDialogs,
                                                        });

                                                    }}
                                                    OnOK={cancelButton => {
                                                        cancelButton.click();
                                                        this.onComponentUpdated();
                                                    }} />;

                                                this.setState({
                                                    EditPermitLicenceDialogs: editPermitLicenceDialogs,
                                                });
                                            }}>
                                            Edit
                                            </button>
                                        <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            {this.state.EditPermitLicenceDialogs[index]}
                        </li>
                    })}
                </ol>
                {this.state.Preloader}
            </section>         
        );
    }
};

export default PermitLicencesList;