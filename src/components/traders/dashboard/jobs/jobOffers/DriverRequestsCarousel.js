import React, { Component } from "react";
import DriverRequest from "./DriverRequest";

class DriverRequestsCarousel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const driverRequestPackages = this.props.DriverRequestPackages;
        return <section>
            <div id="driver-requests-carousel" className="carousel slide" data-ride="false" data-interval="20000" >
                <div style={{ backgroundColor: "#008575", textAlign: "center" }}>
                    {(driverRequestPackages.length > 1) ? 
                        <ul className="pager theme-alt" style={{ margin: "0px" }}>
                            <li className="pager-next">
                                <a href="#driver-requests-carousel" data-slide="prev">
                                    <i aria-hidden="true" className="glyph glyph-chevron-left-2"></i>
                                </a>
                            </li>
                            <li className="pager-next">
                                <a href="#driver-requests-carousel" data-slide="next">
                                    <i aria-hidden="true" className="glyph glyph-chevron-right-2"></i>
                                </a>
                            </li>
                        </ul> : null}
                </div>
                <div className="carousel-inner">
                    {driverRequestPackages.map((driverRequestPackage, index) => {
                        return <div key={index} className={(index === 0) ? "item active" : "item"}>
                            <DriverRequest DriverRequestPackage={driverRequestPackage} Index={0} />
                        </div>;
                    })}
                </div>               
            </div>
        </section>;
    }
};

export default DriverRequestsCarousel;