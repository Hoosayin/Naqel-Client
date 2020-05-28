import React, { Component } from "react";

class BlockedUserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            BlockedUser
        } = this.props;

        return <section>
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="sad.svg" src="./images/sad.svg" data-source-index="2" />
                        </div>
                        <div className="col-md-20">
                            <div className="type-h3 color-default">{`${BlockedUser.FirstName} ${BlockedUser.LastName}, Your Account Has Been Blocked!`}</div>
                            <div className="type-sh3">Up to: <span className="color-default">{new Date(BlockedUser.BlockDate).toDateString()}</span></div>
                            <div className="type-sh4">You cannot use Naqel's services until it is unblocked. See the reason, why our team has blocked your account.</div>
                            <p><span className="color-default">REASON: </span>{BlockedUser.Reason}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default BlockedUserContainer;