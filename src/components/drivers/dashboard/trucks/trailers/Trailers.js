import React, { Component } from "react";
import AddTrailer from "./AddTrailer";
import TrailersList from "./TrailersList"
import { getData } from "../../../DriverFunctions";

class Trailers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddTrailer: null,
            TrailersList: null
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Trailers"
            };

            this.setState({
                AddTrailer: null,
                TrailersList: null
            });

            getData(request).then(response => {
                if (response.Message === "Trailers found.") {

                    if (response.Trailers.length < 2) {
                        this.setState({
                            AddTrailer: <AddTrailer OnTrailerAdded={this.onComponentUpdated} />,
                            TrailersList: <TrailersList Trailers={response.Trailers}
                                OnTrailersUpdated={this.onComponentUpdated} />
                        });
                    }
                    else {
                        this.setState({
                            AddTrailer: null,
                            TrailersList: <TrailersList Trailers={response.Trailers}
                                OnTrailersUpdated={this.onComponentUpdated} />
                        });
                    }
                }
                else {
                    this.setState({
                        AddTrailer: <AddTrailer OnTrailerAdded={this.onComponentUpdated} />,
                        TrailersList: null
                    });
                }
            });
        }
    }

    render() {
        return <section>
            {this.state.AddTrailer}
            {this.state.TrailersList}
        </section>;
    }
};

export default Trailers;