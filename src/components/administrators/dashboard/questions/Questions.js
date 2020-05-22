import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import DriverQuestions from "./driverQuestions/DriverQuestions";
import TraderQuestions from "./traderQuestions/TraderQuestions";

class Questions extends Component {
    render() {
        return <section>
            <PageHeading Heading="QUESTIONS" />
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#driver-questions" aria-controls="driver-questions" role="tab" data-toggle="tab">Drivers' Questions</a>
                </li>
                <li role="presentation">
                    <a href="#trader-questions" aria-controls="trader-questions" role="tab" data-toggle="tab">Traders' Questions</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="driver-questions">
                    <DriverQuestions />
                </div>
                <div role="tabpanel" class="tab-pane" id="trader-questions">
                    <TraderQuestions />
                </div>
            </div>
        </section>;
    }
};

export default Questions;