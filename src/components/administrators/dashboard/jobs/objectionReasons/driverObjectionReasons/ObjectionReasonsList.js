import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import AddObjectionReasonDialog from "./AddObjectionReasonDialog";
import { getData } from "../../../../AdministratorFunctions";

import ObjectionReasonListItem from "./ObjectionReasonListItem";

class ObjectionReasonsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllObjectionReasons: [],
            ObjectionReasons: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "DriverObjectionReasons"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Driver objection reasons found.") {
                    this.setState({
                        AllObjectionReasons: response.ObjectionReasons,
                        ObjectionReasons: response.ObjectionReasons,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllObjectionReasons: [],
                        ObjectionReasons: [],
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

        const searchString = this.state.SearchString;

        if (searchString === "") {
            this.setState({
                ObjectionReasons: this.state.AllObjectionReasons
            });

            return;
        }

        const allObjectionReasons = this.state.AllObjectionReasons;
        let filteredObjectionReasons = [];
        let count = 0;

        for (let objectionReason of allObjectionReasons) {
            if (objectionReason.Reason.includes(searchString)) {
                filteredObjectionReasons[count++] = objectionReason;
            }
        }

        this.setState({
            ObjectionReasons: filteredObjectionReasons
        });
    }

    render() {
        const {
            ObjectionReasons,
            SearchString,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-comment-dots m-r-xxs"></span>Driver Objection Reasons</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-driver-objection-reason-dialog`}>Add New</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddObjectionReasonDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Objection Reasons
                    {Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder="Search"
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(ObjectionReasons.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor="objection reasons" /> :
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>NUMBER</th>
                                <th>VERIFIED</th>
                                <th>REASON</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ObjectionReasons.map((objectionReason, index) => {
                                return <ObjectionReasonListItem key={index}
                                    Index={index}
                                    ObjectionReason={objectionReason}
                                    OnObjectionReasonUpdated={async () => { await this.onComponentUpdated(); }} />;
                            })}
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default ObjectionReasonsList;