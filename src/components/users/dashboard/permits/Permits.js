import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import AddPermitLicenceDialog from "./AddPermitLicenceDialog.js";
import PermitLicencesList from "./PermitLicencesList.js"

class Permits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddPermitLicenceDialog: null,
            PermitLicencesList: null,
        };

        this.onPermitLicencesUpdated = this.onPermitLicencesUpdated.bind(this);
    }

    componentDidMount() {
        this.onPermitLicencesUpdated();
    }

    onPermitLicencesUpdated = () => {
        const permitLicences = jwt_decode(localStorage.userToken).PermitLicences;

        if (permitLicences) {
            this.setState({
                PermitLicencesList: null
            });
            this.setState({
                PermitLicencesList: <PermitLicencesList OnPermitLicencesUpdated={this.onPermitLicencesUpdated} />
            });
        }
        else {
            this.setState({
                PermitLicencesList: null
            });
        }
    }

    render() {
        return (
            <section>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="permit.png" src="./images/permit.png" data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Permit Licences</div>
                                <div class="type-sh3">Manage your Permits</div>
                                <p>If you are a non-Saudi driver, then you must have at least one permit licence.</p>
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#add-permit-licence-dialog"
                                        onMouseDown={() => {
                                            this.setState({
                                                AddPermitLicenceDialog: (<AddPermitLicenceDialog
                                                    OnCancel={() => {
                                                        this.setState({
                                                            AddPermitLicenceDialog: null,
                                                        });
                                                    }}
                                                    OnOK={cancelButton => {
                                                        cancelButton.click();
                                                        this.onPermitLicencesUpdated();
                                                    }} />),
                                            });
                                        }}>
                                        New Permit Licence
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.AddPermitLicenceDialog}
                {this.state.PermitLicencesList}
            </section>
        );
    }
};

export default Permits;