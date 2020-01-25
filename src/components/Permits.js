import React, { Component } from "react";

class Permits extends Component {
    render() {
        return (
            <div>
                <div class="jumbotron" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="tools.png" src="./images/tools.png" style={{ borderRadius: "50%" }} data-source-index="1" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3" style={{ color: "#008575", }}>
                                    Permits
                    </div>
                                <div class="type-sh3" style={{ color: "#949496", }}>
                                    Under-Construction
                    </div>
                                <p style={{ color: "#D1D2D4", }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat sollicitudin dui mollis imperdiet. Nam fringilla sed odio sit amet luctus. In hac habitasse platea dictumst. Nunc non nulla in quam porttitor pretium eget congue metus. Morbi volutpat nisl ut urna interdum mollis. Cras pretium nisi vel neque vulputate, a luctus purus dictum. Mauris non mauris semper, consectetur nisi id, lacinia libero. Curabitur ante diam, viverra at sagittis quis, ullamcorper quis felis. Curabitur maximus tellus non sagittis finibus. Nullam ut dolor tincidunt nisi fermentum suscipit. Maecenas eleifend lorem sit amet massa tristique facilisis. Nunc varius velit et magna suscipit gravida. Phasellus lobortis congue magna ut iaculis. Sed sodales ut tortor a interdum. Maecenas sagittis augue augue, eu sollicitudin libero volutpat eu. Phasellus tempor lobortis gravida</p>
                                <h4 style={{ fontWeight: "bold", color: "#006F61", }}>
                                    SABER MAIS
                    </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Permits;