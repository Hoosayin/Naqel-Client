import React, { Component } from "react";
import EarningsList from "./EarningsList";

class FinancialAffairs extends Component {
    render() {
        return <section>
            <EarningsList Refresh={this.props.Refresh} />
        </section>;
    }
};

export default FinancialAffairs;