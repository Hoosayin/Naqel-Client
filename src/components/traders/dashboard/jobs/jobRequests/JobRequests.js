import React, { Component } from "react";
import JobRequestPostsList from "./JobRequestPostsList";

class JobOffers extends Component {
   render() {
       return <section>
           <JobRequestPostsList Refresh={this.props.Refresh} />
       </section>;
    }
};

export default JobOffers;