import React, { Component } from "react";
import AddPermitLicenceDialog from "./AddPermitLicenceDialog.js";
import PermitLicencesList from "./PermitLicencesList.js";
import PageHeading from "../../../../controls/PageHeading";

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
                <PageHeading Heading="PERMITS" />
                <div class="page-header" style={{
                    backgroundImage: "url(/images/teal.jpg)",
                    backgroundSize: "cover",
                    backgroundColor: "#215761"
                }}>
                    <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                        <div class="row">
                            <div class="col-xs-18">
                                <div className="type-h3 color-light"><span className="fas fa-id-badge"></span>   Permit Licences</div>
                                <p className="color-light">If you are a non-Saudi driver, then you must have at least one permit licence.</p>
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
                                        }}>New Permit Licence</button>
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