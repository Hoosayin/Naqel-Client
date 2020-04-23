import React, { Component } from "react";
import CompletedJobsList from "./CompletedJobsList";

class CompletedJobs extends Component {
   render() {
       return <section>
           <CompletedJobsList />
       </section>;
    }
};

export default CompletedJobs;