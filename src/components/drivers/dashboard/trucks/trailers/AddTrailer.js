import React, { Component } from "react";
import AddTrailerDialog from "./AddTrailerDialog";

class AddTrailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddTrailerDialog: null
        };
    }

    render() {
        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-truck-pickup m-r-xxs m-l-xxs"></span>{Dictionary.Trailers}</div>
                            <p className="color-light">{Dictionary.TrailersSubtitle}</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ minWidth: "152px" }}
                                    data-toggle="modal"
                                    data-target="#add-trailer-dialog"
                                    onMouseDown={() => {
                                        this.setState({
                                            AddTrailerDialog: <AddTrailerDialog
                                                OnCancel={() => {
                                                    this.setState({
                                                        AddTrailerDialog: null
                                                    });
                                                }}
                                                OnOK={cancelButton => {
                                                    cancelButton.click();
                                                    this.props.OnTrailerAdded();
                                                }} />
                                        });
                                    }}>{Dictionary.AddTrailer}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.AddTrailerDialog} 
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Trailers: "المقطورات",
        TrailersSubtitle: ".موصى به: نظرًا لأنه تم إعداد شاحنتك بالكامل ، فأنت على ما يرام لإضافة مقطورتين إليها",
        AddTrailer: "إضافة مقطع دعائي",
    };
}
else {
    Dictionary = {
        Trailers: "Trailers",
        TrailersSubtitle: "RECOMMENDED: Since your truck is all set up, you're good to go for adding up to TWO trailers to it.",
        AddTrailer: "Add Trailer",
    };
}

export default AddTrailer;