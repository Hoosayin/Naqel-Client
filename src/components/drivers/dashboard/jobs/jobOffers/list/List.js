import React, { Component } from "react";
import JobOfferPostsList from "./JobOfferPostsList";

class List extends Component {
   render() {
       return <section>
           <JobOfferPostsList Refresh={this.props.Refresh} />
       </section>;
    }
};

export default List;