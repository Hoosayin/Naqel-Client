import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import AccountStatement from "./accountStatement/AccountStatement";
import TrucksAccountStatements from "./trucksAccountStatement/TrucksAccountStatements";

class FinancialAccounts extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="FINANCIAL ACCOUNTS" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#account-statement" aria-controls="account-statement" role="tab" data-toggle="tab">{Dictionary.AccountStatement}</a>
                </li>
                <li role="presentation">
                    <a href="#trucks-account-statement" aria-controls="trucks-account-statement" role="tab" data-toggle="tab">{Dictionary.TrucksAccountStatements}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="account-statement">
                    <AccountStatement />
                </div>
                <div role="tabpanel" class="tab-pane" id="trucks-account-statement">
                    <TrucksAccountStatements />
                </div>
            </div>
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
        AccountStatement: "كشف حساب",
        TrucksAccountStatements: "كشوف حسابات الشاحنات"
    };
}
else {
    Dictionary = {
        AccountStatement: "Account Statement",
        TrucksAccountStatements: "Trucks' Account Statements"
    };
}

export default FinancialAccounts;