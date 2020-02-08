import React, { Component } from "react";
import { PreloaderScreen } from "../styles/MiscellaneousStyles";

class Preloader extends Component {
    render() {
        return (
            <div style={PreloaderScreen}>
                <div style={{ textAlign: "center" }}>
                    <img src="./images/preloader.gif" alt="preloader.gif" height="200" />
                </div>
            </div>
        );
    }
};

export default Preloader;