import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { deletePermitLicence } from "../../DriverFunctions.js";
import EditPermitLicenceDialog from "./EditPermitLicenceDialog.js";
import Preloader from "../../../../controls/Preloader.js";

class PermitLicencesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitLicences: [],
            EditPermitLicenceDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getPermitLicences = this.getPermitLicences.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedPermitLicence = {
            Token: localStorage.getItem("userToken"),
            PermitLicenceID: this.state.PermitLicences[index].PermitLicenceID 
        };

        console.log(`Going to delete PermitLicences[${index}]`);

        await deletePermitLicence(discardedPermitLicence)
            .then(response => {
                if (response.Message === "Permit Licence is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnPermitLicencesUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        this.getPermitLicences();
    }

    getPermitLicences = () => {
        if (localStorage.userToken) {
            const permitLicences = jwt_decode(localStorage.userToken).PermitLicences;

            this.setState({
                PermitLicences: permitLicences
            });
        }
        else {
            this.setState({
                PermitLicences: []
            });
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        if (this.state.SearchString === "") {
            this.getPermitLicences();
            return;
        }

        const filteredPermitLicences = [];

        for (var i = 0; i < this.state.PermitLicences.length; i++) {
            if (this.state.PermitLicences[i].Place === this.state.SearchString) {
                filteredPermitLicences[i] = this.state.PermitLicences[i];
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
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Permit Licences</div>
                <nav class="navbar navbar-default">
                    <div class="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <form noValidate onSubmit={this.onSearch} class="navbar-form navbar-right" role="search">
                                <div class="putbox" style={{ margin: "0px" }}>
                                    <div class="form-group">
                                        <input type="search" name="SearchString" class="form-control" placeholder="Search by Permit Place"
                                            style={{ maxWidth: "500px", width: "100%" }} autoComplete="off"
                                            value={this.state.SearchString} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" class="btn btn-default form-control" style={{ width: "34px" }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <ol class="list-items" style={{ margin: "0px" }}>
                    {this.state.PermitLicences.map((value, index) => {
                        return <li class="list-items-row">
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.PermitLicenceID}`}>
                                <div class="row">
                                    <div class="col-md-2">
                                        <i class="glyph glyph-add"></i>
                                        <i class="glyph glyph-remove"></i>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div class="col-md-4">
                                        <img class="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                            src={value.PhotoURL} alt="permit.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div class="col-md-6">
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Permit Number:</span> {value.PermitNumber}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Expiry Date:</span> {value.ExpiryDate}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Permit Code:</span> {value.Code}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Permit Place:</span> {value.Place}
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="collapse" id={value.PermitLicenceID}>
                                <div class="row">
                                    <div class="col-md-18 col-md-offset-2">
                                        <img class="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                            src={value.PhotoURL} alt="permit.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <button
                                            type="button"
                                            class="btn btn-primary"
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
                                                        this.props.OnPermitLicencesUpdated();
                                                    }} />;

                                                this.setState({
                                                    EditPermitLicenceDialogs: editPermitLicenceDialogs,
                                                });
                                            }}>
                                            Edit
                                            </button>
                                        <button type="button" class="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
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