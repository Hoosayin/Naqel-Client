import React, { Component } from "react";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobObjectionContainer from "../../../../../../containers/onGoingJob/JobObjectionContainer";
import { getData } from "../../../../AdministratorFunctions";

class Objections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobObjections: [],
            Searching: false,
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobObjections",
                Params: {
                    OnGoingJobID: this.props.OnGoingJobID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job objections found.") {
                    this.props.OnObjectionsFound(response.JobObjections.length);

                    this.setState({
                        JobObjections: response.JobObjections,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobObjections: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            JobObjections,
            Searching
        } = this.state;

        return <section>
            {(JobObjections.length === 0) ?
                <SearchingContainer Searching={Searching}
                    SearchingFor="job objctions" /> :
                <ol className="list-items m-n">
                    {JobObjections.map((jobObjection, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobObjectionContainer Index={index} JobObjection={jobObjection} />
                        </li>;
                    })}
                </ol>}
       </section>;
    }
};

export default Objections;