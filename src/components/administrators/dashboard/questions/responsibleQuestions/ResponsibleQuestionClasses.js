import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import { getData, addResponsibleQuestionClass } from "../../../AdministratorFunctions";

class ResponsibleQuestionClasses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            QuestionClasses: [],
            AddPressed: false,
            NewClass: "",
            ValidNewClass: false,

            ValidForm: false,
            ShowProgressRing: false,

            Errors: {
                NewClass: "No error.",
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
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "ResponsibleQuestionClasses"
            };

            this.setState({
                ShowProgressRing: true
            });

            await getData(request).then(response => {
                if (response.Message === "Question classes found.") {
                    this.setState({
                        QuestionClasses: response.QuestionClasses,
                        ShowProgressRing: false
                    });
                }
                else {
                    this.setState({
                        QuestionClasses: [],
                        ShowProgressRing: false
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
        let ValidNewClass = this.state.ValidNewClass;

        switch (field) {
            case "NewClass":
                ValidNewClass = (value != "");
                Errors.NewClass = ValidNewClass ? "No error." : "New class in required";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidNewClass: ValidNewClass
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidNewClass
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowProgressRing: true
        });

        const newResponsibleQuestionClass = {
            Token: localStorage.Token,
            Class: this.state.NewClass
        };

        await addResponsibleQuestionClass(newResponsibleQuestionClass).then(response => {
            this.setState({
                ShowProgressRing: null
            });

            if (response.Message === "Question class is added.") {
                let questionClasses = this.state.QuestionClasses;
                let errors = this.state.Errors;

                questionClasses.push(response.QuestionClass);
                errors.NewClass = "No error.";

                this.setState({
                    AddPressed: false,
                    QuestionClasses: questionClasses,
                    Errors: errors,
                    NewClass: ""
                });
            }
        });
    }

    render() {
        const {
            QuestionClasses,
            ShowProgressRing,
            AddPressed,
            NewClass,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            {ShowProgressRing ? <ProgressRing /> : null}
            <div class="entity-list entity-list-expandable">
                <div class="entity-list entity-list-add-item-button">
                    <a class={AddPressed ? "entity-list-item active" : "entity-list-item"}>
                        <div class="item-icon" onClick={() => {
                            this.state.AddPressed ?
                                this.setState({ AddPressed: false }) :
                                this.setState({ AddPressed: true });
                        }}>
                            <span class="glyph glyph-add"></span>
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">Add a Class</div>
                            <div class="content-text-secondary">{Errors.NewClass}</div>
                        </div>
                        <div class="item-content-expanded">
                            <form noValidate onSubmit={this.onSubmit}>
                                <input type="text" className="form-control" name="NewClass" autoComplete="off"
                                    value={NewClass} onChange={this.onChange} />
                                <input type="submit" value="Add" className="btn btn-secondary" disabled={!ValidForm} />
                            </form>
                        </div>
                    </a>
                </div>
                {QuestionClasses.map((questionClass, index) => {
                    return <div key={index} class="entity-list-item">
                        <div class="item-icon">
                            <span class="fas fa-cog"></span>
                        </div>
                        <div class="item-content-secondary">
                            <button type="button" class="btn btn-secondary" style={{ margin: "0px", minWidth: "0px" }}
                                onClick={() => { this.props.OnClassSelected(questionClass.Class); }}>Select</button>
                        </div>
                        <div class="item-content-primary">
                            <div class="content-text-primary">{`${index + 1}.`}</div>
                            <div class="content-text-secondary">{questionClass.Class}</div>
                        </div>
                    </div>;
                })}
            </div>
        </section>;
    }
};

export default ResponsibleQuestionClasses;