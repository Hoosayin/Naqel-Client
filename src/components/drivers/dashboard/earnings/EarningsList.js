import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import ProgressRing from "../../../../controls/ProgressRing";
import EarningListItem from "./EarningListItem";
import Strings from "../../../../res/strings";
import { getData } from "../../DriverFunctions";

class EarningsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Earnings: [],
            NetEarning: 0,
            Searching: false,
            Refreshing: false,
        }

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Earnings"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Earnings found.") {
                    this.setState({
                        Earnings: response.Earnings,
                        NetEarning: response.NetEarning,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        Earnings: [],
                        NetEarning: 0,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Earnings"
            };

            this.setState({
                Refreshing: true
            });

            await getData(request).then(response => {
                if (response.Message === "Earnings found.") {
                    this.setState({
                        Earnings: response.Earnings,
                        NetEarning: response.NetEarning,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        Earnings: [],
                        NetEarning: 0,
                        Refreshing: false
                    });
                }
            });
        }
    };

    render() {
        const earnings = this.state.Earnings;
        const netEarning = this.state.NetEarning; 

        return <section>
            {/* <PageHeading Heading="EARNINGS" /> */}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
        <div className="type-h3 color-light"><span className="fas fa-coins m-r-xs"></span>{Dictionary.Earnings}</div>
        <p className="color-light">{Dictionary.EarningsSubtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="alert alert-info m-n" style={{ backgroundColor: "#333333" }}>
                <div class="row">
                    <div class="col-md-6">
                        <div className="entity-list theme-alt">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#333333", color: "#008575" }}>
                                    <span className="fas fa-dollar-sign"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.NetEarning}</div>
                                    <div className="content-text-secondary">{`${netEarning.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
        <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>{Dictionary.YourEarnings}
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>

            {(earnings.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                    SearchingFor="earnings" /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>{Dictionary.Number}</th>
            <th>{Dictionary.Amount}</th>
            <th>{Dictionary.JobNumber}</th>
                                <th>{Dictionary.DuesPaid}</th>
            <th>{Dictionary.EarnedOn}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.map((earning, index) => {
                                return <EarningListItem key={index}
                                    Index={index}
                                    Earning={earning} />;
                            })}
                        </tbody>
                    </table>
                </div>}
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
        Earnings: "أرباح",
        EarningsSubtitle: "رسوم الوظيفة: في حال كان لديك بعض المستحقات غير المدفوعة ، يجب عليك دفعها من قسم المدفوعات.",
        NetEarning: "صافي ربح",
        YourEarnings: "أرباحك",
        Number: "رقم",
        Amount: "كمية",
        JobNumber: "رقم امر العمل",
        DuesPaid: "مدفوعة المستحقات؟",
        EarnedOn: "مكسب",
    };
}
else {
    Dictionary = {
        Earnings: "Earnings",
        EarningsSubtitle: "JOB CHARGES: In case you have some unpaid dues, you must pay them from Payments section.",
        NetEarning: "Net Earning",
        YourEarnings: "Your Earnings",
        Number: "NUMBER",
        Amount: "AMOUNT",
        JobNumber: "JOB NUMBER",
        DuesPaid: "DUES PAID?",
        EarnedOn: "EARNED ON",
    };
}

export default EarningsList;