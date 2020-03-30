import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Strings from "../../res/strings"

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Username: "User"
        };

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);

            this.setState({
                Username: decoded.Username
            });
        }
        else if (localStorage.Token) {
            this.setState({
                Username: "Trader"
            });
        }
        else {
            this.setState({
                Username: "User"
            });
        }
    }

    logOut = event => {
        event.preventDefault();

        if (localStorage.userToken) {
            localStorage.removeItem("userToken");
        }
        else if (localStorage.Token) {
            localStorage.removeItem("Token");
        }

        this.props.history.push(`/login`);
    }

    render() {
        const loginRegisterLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>            
            </ul>
        );

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/dashboard">{this.state.Username}</Link>
                </li>
                <li>
                    <Link to="" onClick={this.logOut.bind(this)}>Logout</Link>
                </li>
            </ul>
        );

        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="navbar-local color-accent theme-dark">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                                    <span className="sr-only">Toggle navigation</span>
                                    <i className="glyph glyph-hamburger"></i>
                                </button>
                                <Link to="/" className="navbar-brand">{Strings.APP_NAME.toUpperCase()}</Link>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                                <ul className="nav navbar-nav">
                                    
                                </ul>
                                {(localStorage.userToken || localStorage.Token) ? userLinks : loginRegisterLinks}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
};

export default withRouter(Header);