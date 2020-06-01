import React, { Component } from "react";
import AddCommercialRegisterCertifcateDialog from "./commercialRegisterCertificate/AddCommercialRegisterCertificateDialog";
import CommercialRegisterCertificateListItem from "./commercialRegisterCertificate/CommercialRegisterCertificateListItem";
import { getData } from "../../../TransportCompanyResponsiblesFunctions";

class DocumentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CommercialRegisterCertificate: null,
            Searching: false,
        };
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "CommercialRegisterCertificate"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Commercial register certificate found.") {
                    this.setState({
                        CommercialRegisterCertificate: response.CommercialRegisterCertificate,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        CommercialRegisterCertificate: null,
                        Searching: false
                    });
                }
            });
        }
    }

    render() {
        const {
            CommercialRegisterCertificate,
            Searching
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 back-color-gray m-n p-xxs">Documents</div>

            {Searching ? null : <section>
                <div className="text-right back-color-gray p-xxs">
                    {CommercialRegisterCertificate ?
                        null :
                        <section>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#add-commercial-register-certificate-dialog">Add CR Certificate</button>
                            <AddCommercialRegisterCertifcateDialog
                                OnOK={commercialRegisterCertificate => {
                                    this.setState({
                                        CommercialRegisterCertificate: commercialRegisterCertificate
                                    });
                                }} />
                        </section>}
                </div>

                <ol className="list-items m-n">
                    {CommercialRegisterCertificate ?
                        <CommercialRegisterCertificateListItem
                            CommercialRegisterCertificate={CommercialRegisterCertificate}
                            OnCertificateDeleted={() => {
                                this.setState({
                                    CommercialRegisterCertificate: null
                                });
                            }}
                            OnCertificateUpdated={updatedCertificate => {
                                let {
                                    CommercialRegisterCertificate
                                } = this.state;

                                CommercialRegisterCertificate.Type = updatedCertificate.Type;
                                CommercialRegisterCertificate.PhotoURL = updatedCertificate.PhotoURL;

                                this.setState({
                                    CommercialRegisterCertificate: CommercialRegisterCertificate
                                });
                            }} /> : null}
                </ol>
            </section>}
        </section>;
    }
};

export default DocumentsList;