import React, { Component } from "react";
import AccountStatement from "./accountStatement/AccountStatement";

class TruckAccountStatementBrowser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchString: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();
        this.SearchTruckAccountStatement(this.state.SearchString);
    }

    render() {
        const {
            SearchString
        } = this.state;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-university m-r-xxs m-l-xxs"></span>{Dictionary.TrucksAccountStatements}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.AccountStatement}</div>

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchTruckNumber}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            <AccountStatement SearchTruckAccountStatement={searchTruckAccountStatement => {
                this.SearchTruckAccountStatement = searchTruckAccountStatement;
            }} />
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        TrucksAccountStatements: "كشوف حسابات الشاحنات",
        AccountStatement: "كشف حساب",
        SearchTruckNumber: "رقم شاحنة البحث",
    };
}
else {
    Dictionary = {
        TrucksAccountStatements: "Trucks' Account Statements",
        AccountStatement: "Account Statement",
        SearchTruckNumber: "Search Truck Number",
    };
}

export default TruckAccountStatementBrowser;