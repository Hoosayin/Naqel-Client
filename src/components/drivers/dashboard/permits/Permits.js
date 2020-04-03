import React, { Component } from "react";
import AddPermitLicenceDialog from "./AddPermitLicenceDialog.js";
import PermitLicencesList from "./PermitLicencesList.js"

class Permits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddPermitLicenceDialog: null
        };

        this.onPermitLicencesUpdated = this.onPermitLicencesUpdated.bind(this);
    }

    componentDidMount() {
        this.onPermitLicencesUpdated();
    }

    onPermitLicencesUpdated = () => {
        this.PermitLicencesList.onComponentUpdated();
    }

    render() {
        return (
            <section>
                <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="permit.png" src="./images/permit.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Permit Licences</div>
                                <div className="type-sh3">Manage your Permits</div>
                                <p>If you are a non-Saudi driver, then you must have at least one permit licence.</p>
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
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
                                        New Permit Licence</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PermitLicencesList ref={permitLicencesList => this.PermitLicencesList = permitLicencesList} />
                {this.state.AddPermitLicenceDialog}
            </section>
        );
    }
};

export default Permits;