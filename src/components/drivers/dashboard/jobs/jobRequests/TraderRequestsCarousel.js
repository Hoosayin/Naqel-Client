import React, { Component } from "react";
import TraderRequest from "./TraderRequest";

class TraderRequestsCarousel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const traderRequestPackages = this.props.TraderRequestPackages;
        return <section>
            <div id="myCarousel" className="carousel slide" data-ride="false" data-interval="20000" >
                <div style={{ backgroundColor: "#008575", textAlign: "center" }}>
                    {(traderRequestPackages.length > 1) ? 
                        <ul className="pager theme-alt" style={{ margin: "0px" }}>
                            <li className="pager-next">
                                <a href="#myCarousel" data-slide="prev">
                                    <i aria-hidden="true" className="glyph glyph-chevron-left-2"></i>
                                </a>
                            </li>
                            <li className="pager-next">
                                <a href="#myCarousel" data-slide="next">
                                    <i aria-hidden="true" className="glyph glyph-chevron-right-2"></i>
                                </a>
                            </li>
                        </ul> : null}
                </div>
                <div className="carousel-inner">
                    {traderRequestPackages.map((traderRequestPackage, index) => {
                        return <div key={index} className={(index === 0) ? "item active" : "item"}>
                            <TraderRequest TraderRequestPackage={traderRequestPackage} Index={0} />
                        </div>;
                    })}
                </div>               
            </div>
        </section>;
    }
};

export default TraderRequestsCarousel;