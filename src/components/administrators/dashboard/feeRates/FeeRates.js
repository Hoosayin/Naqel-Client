import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import GeneralRates from "./generalRates/GeneralRates";
import TraderRates from "./traderRates/TraderRates";

class FeeRates extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="FEE RATES" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#general-rates" aria-controls="general-rates" role="tab" data-toggle="tab">General Rates</a>
                </li>
                <li role="presentation">
                    <a href="#trader-rates" aria-controls="trader-rates" role="tab" data-toggle="tab">Trader Rates</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="general-rates">
                    <GeneralRates />
                </div>
                <div role="tabpanel" class="tab-pane" id="trader-rates">
                    <TraderRates />
                </div>
            </div>
        </section>;
    }
};

export default FeeRates;