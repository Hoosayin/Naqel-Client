import React, { Component } from "react";
import $ from "jquery";

class BackToTop extends Component {
    render() {
        return (
            <a id="up" href="#top" class="back-to-top" style={{ position: "fixed", left: "20px", bottom: "20px", }}>
                <i class="glyph glyph-up" style={{ color: "#008575", }}></i>
                <span class="sr-only">Back to top</span>
            </a>
        );
    }
};

export default BackToTop;