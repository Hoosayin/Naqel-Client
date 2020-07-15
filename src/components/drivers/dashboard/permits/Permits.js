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
                {/* <PageHeading Heading="PERMITS" /> */}
                <div class="page-header" style={{
                    backgroundImage: "url(/images/poly_back.jpg)",
                    backgroundSize: "cover",
                    backgroundColor: "#215761"
                }} dir={GetDirection()}>
                    <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                        <div class="row">
                            <div class="col-xs-18">
                                <div className="type-h3 color-light"><span className="fas fa-id-badge m-r-xxs"></span>{Dictionary.PermitLicences}</div>
                                <p className="color-light">{Dictionary.PermitLicencesSubtitle}</p>
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
                                        }}>{Dictionary.NewPermitLicence}</button>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        PermitLicences: "تصاريح التراخيص",
        PermitLicencesSubtitle: ".إذا كنت سائقًا غير سعودي ، فيجب أن يكون لديك رخصة واحدة على الأقل",
        NewPermitLicence: "رخصة تصريح جديدة",
    };
}
else {
    Dictionary = {
        PermitLicences: "Permit Licences",
        PermitLicencesSubtitle: "If you are a non-Saudi driver, then you must have at least one permit licence.",
        NewPermitLicence: "New Permit Licence",
    };
}

export default Permits;