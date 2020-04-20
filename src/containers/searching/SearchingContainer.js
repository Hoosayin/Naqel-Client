import React, { Component } from "react";
import ProgressBar from "../../controls/ProgressBar";

class SearchingContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const searching = this.props.Searching;
        const searchingFor = this.props.SearchingFor;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        {searching ? <div className="col-md-24 text-center">
                            <div>
                                <div className="type-h3" style={{ color: "#008575" }}>Searching</div>
                                <ProgressBar />
                            </div>
                        </div> : <div className="col-md-24 text-center">
                                <h3><span className="fas fa-exclamation-triangle" style={{ color: "#FFBF15" }}></span>{` No ${searchingFor} found.`}</h3>
                            </div>}
                    </div>
                </div>
            </div> 
        </section>;
    }
};

export default SearchingContainer;