import React, { Component } from "react";
import GlobalAndTemporaryRates from "./globalAndTemporayRates/GlobalAndTemporaryRates";
import PriceRanges from "./priceRanges/PriceRanges";

class GeneralRates extends Component {
    render() {
        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-tag m-r-xxs"></span>General Rates</div>
                        </div>
                    </div>
                </div>
            </div>

            <GlobalAndTemporaryRates />
            <PriceRanges />
        </section>;
    }
};

export default GeneralRates;