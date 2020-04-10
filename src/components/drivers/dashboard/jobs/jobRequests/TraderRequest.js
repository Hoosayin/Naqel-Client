import React, { Component } from "react";
import TraderRequestTab from "./TraderRequestTab";
import TraderTab from "./TraderTab";

class JobRequestTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const traderRequestPackage = this.props.TraderRequestPackage;
        const trader = traderRequestPackage.Trader;
        const profilePhoto = traderRequestPackage.ProfilePhoto; 
        const traderRequest = traderRequestPackage.TraderRequest;

        return <section>
            <ul className="nav nav-tabs" role="tablist"
                style={{
                    padding: "10px",
                    backgroundColor: "#EFEFEF",
                    width: "100%",
                    margin: "0px"
                }}>
                <li role="presentation" className="active">
                    <a href={`#trader-request-tab-${index}`} aria-controls={`trader-request-tab-${index}`} role="tab" data-toggle="tab">{`Request # ${index + 1}.`}</a>
                </li>
                <li role="presentation">
                    <a href={`#trader-tab-${index}`} aria-controls={`trader-tab-${index}`} role="tab" data-toggle="tab">{trader.Type}</a>
                </li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id={`trader-request-tab-${index}`}>
                    <TraderRequestTab TraderRequest={traderRequest} Index={index} />
                </div>
                <div role="tabpanel" className="tab-pane" id={`trader-tab-${index}`}>
                    <TraderTab Trader={trader} ProfilePhoto={profilePhoto} />
                </div>
            </div>
            <div style={{ backgroundColor: "#EFEFEF", textAlign: "right", padding: "10px" }}>
                <button className="btn btn-primary">Start Job</button>
            </div>
       </section>;
    }
};

export default JobRequestTab;