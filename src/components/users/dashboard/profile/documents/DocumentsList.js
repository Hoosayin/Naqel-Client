import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import DrivingLicenceListItem from "./drivingLicence/DrivingLicenceListItem.js"; 


class DocumentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DrivingLicenceListItem: null,
        };
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const driver = jwt_decode(localStorage.userToken);
            let index = 0;

            if (driver.DrivingLicence) {
                this.setState({
                    DrivingLicenceListItem: <DrivingLicenceListItem
                        Index={++index}
                        OnDocumentsUpdated={this.props.OnDocumentsUpdated} />
                });

            }
        }
    }

    render() {
        return (
            <section>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Documents</div>
                <ol class="list-items" style={{ margin: "0px" }}>
                    {this.state.DrivingLicenceListItem}
                </ol>
            </section>         
        );
    }
};

export default DocumentsList;