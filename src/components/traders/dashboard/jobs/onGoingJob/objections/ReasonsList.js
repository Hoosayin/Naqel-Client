import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";
import { getData, addObjectionReason } from "../../../../TraderFunctions";

class ReasonsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ObjectionReasons: [],
            AddPressed: false,
            NewReason: "",
            ValidNewReason: false,

            ValidForm: false,
            ProgressRing: null,

            Errors: {
                NewReason: "0",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "ObjectionReasons"
            };

            this.setState({
                ProgressRing: <ProgressRing />
            });

            await getData(request).then(response => {
                if (response.Message === "Objection reasons found.") {
                    this.setState({
                        ObjectionReasons: response.ObjectionReasons,
                        ProgressRing: false
                    });
                }
                else {
                    this.setState({
                        ObjectionReasons: [],
                        ProgressRing: false
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidNewReason = this.state.ValidNewReason;

        switch (field) {
            case "NewReason":
                ValidNewReason = (value.length > 0 && value.length <= 50);
                Errors.NewReason = ValidNewReason ? value.length : Dictionary.TooLong;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidNewReason: ValidNewReason
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidNewReason
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ProgressRing: <ProgressRing />
        });

        const newObjectionReason = {
            Token: sessionStorage.Token,
            Reason: this.state.NewReason
        };

        console.log("Going to add Objection reason...");

        await addObjectionReason(newObjectionReason).then(response => {
            if (response.Message === "Objection reason is added.") {
                let objectionReasons = this.state.ObjectionReasons;
                let errors = this.state.Errors;

                objectionReasons.push(response.ObjectionReason);
                errors.NewReason = "0";

                this.setState({
                    AddPressed: false,
                    ObjectionReasons: objectionReasons,
                    Errors: errors,
                    NewReason: ""
                });
            }

            this.setState({
                ProgressRing: null
            });
        });
    }

    render() {
        const objectionReasons = this.state.ObjectionReasons;

        return <section>
            {this.state.ProgressRing}
            <div class="entity-list entity-list-expandable">
                <div class="entity-list entity-list-add-item-button">
                    <a class={this.state.AddPressed ? "entity-list-item active" : "entity-list-item"}>
                        <div class="item-icon" onClick={() => {
                            this.state.AddPressed ?
                                this.setState({ AddPressed: false }) :
                                this.setState({ AddPressed: true });
                        }}>
                            <span class="glyph glyph-add"></span>
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">{Dictionary.AddAReason}</div>
                            <div class="content-text-secondary" style={(this.state.Errors.NewReason === "Too long...") ? { color: "#D75A4A" } : null}>{this.state.Errors.NewReason}</div>
                        </div>
                        <div class="item-content-expanded">
                            <form noValidate onSubmit={this.onSubmit}>
                                <input type="text" className="form-control" name="NewReason" autocomplete="off"
                                    value={this.state.NewReason} onChange={this.onChange} />
                                <input type="submit" value={Dictionary.Add} className="btn btn-secondary" disabled={!this.state.ValidForm} />
                            </form>
                        </div>
                    </a>
                </div>
                {objectionReasons.map((objectionReason, index) => {
                    return <div key={index} class="entity-list-item">
                        <div class="item-icon">
                            <span class="fas fa-thumbs-down"></span>
                        </div>
                        <div class="item-content-secondary">
                            <button type="button" class="btn btn-secondary" style={{ margin: "0px", minWidth: "0px" }}
                                onClick={() => { this.props.OnReasonSelected(objectionReason.Reason); }}>{Dictionary.Select}</button>
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">{`${index + 1}.`}</div>
                            <div class="content-text-secondary">{objectionReason.Reason}</div>
                        </div>
                    </div>;
                })}
            </div>
        </section>;
    }
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddAReason: "أضف سببًا",
        Add: "أضف",
        TooLong: "...طويل جدا",
        Select: "تحديد"
    };
}
else {
    Dictionary = {
        AddAReason: "Add a Reason",
        Add: "Add",
        TooLong: "Too long...",
        Select: "Select"
    };
}

export default ReasonsList;