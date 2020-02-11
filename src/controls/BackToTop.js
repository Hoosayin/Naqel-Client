import React, { Component } from "react";

class BackToTop extends Component {
    render() {
        return (
            <a id="up" href="#top" class="back-to-top" style={{ position: "fixed", right: "20px", bottom: "20px", }}>
                <i class="glyph glyph-up" style={{ color: "#008575", }}></i>
                <span class="sr-only">Back to top</span>
            </a>
        );
    }
};

export default BackToTop;