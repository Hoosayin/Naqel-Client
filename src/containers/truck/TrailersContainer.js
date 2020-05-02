import React, { Component } from "react";
import TrailerContainer from "./TrailerContainer";
import SearchingContainer from "../searching/SearchingContainer";

class TrailersDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const trailers = this.props.Trailers;

        return (trailers.length === 0) ?
            <SearchingContainer Searching={false}
                SearchingFor="trailers" /> : 
            <section>
                <ol className="list-items" style={{ margin: "0px" }}>
                    {trailers.map((trailer, index) => {
                        return <TrailerContainer key={index} Index={index} Trailer={trailer} />;
                    })}
                </ol>
            </section>;
    }
};

export default TrailersDialog;