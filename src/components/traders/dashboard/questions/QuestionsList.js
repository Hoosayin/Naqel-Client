import React, { Component } from "react";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import ProgressRing from "../../../../controls/ProgressRing";
import PageHeading from "../../../../controls/PageHeading";
import AskQuestionDialog from "./AskQuestionDialog";
import QuestionListItem from "./QuestionListItem";
import { getData } from "../../TraderFunctions";

class QuestionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllQuestions: [],
            Questions: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Questions"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Questions found.") {
                    this.setState({
                        AllQuestions: response.Questions,
                        Questions: response.Questions,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllQuestions: [],
                        Questions: [],
                        Searching: false
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        const searchString = this.state.SearchString;

        if (searchString === "") {
            this.setState({
                Questions: this.state.AllQuestions
            });

            return;
        }

        const allQuestions = this.state.AllQuestions;
        let filteredQuestions = [];
        let count = 0;

        for (let question of allQuestions) {
            if (question.Question.includes(searchString) ||
                question.QuestionNumber.includes(searchString) ||
                question.Class.includes(searchString)) {
                filteredQuestions[count++] = question;
            }
        }

        this.setState({
            Questions: filteredQuestions
        });
    }

    render() {
        const {
            Questions,
            SearchString,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            {/* <PageHeading Heading="QUESTIONS" /> */}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-question-circle m-r-xxs m-l-xxs"></span>{Dictionary.Questions}</div>
                            <p className="color-light">{Dictionary.QuestionsSubtitle}</p>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#ask-question-dialog`}>{Dictionary.AskQuestion}</button>
                        </div>
                    </div>
                </div>
            </div>

            <AskQuestionDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.YourQuestions}
                    {Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>
            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchQuestions}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(Questions.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.Questions} /> :
                <ol className="list-items m-n">
                    {Questions.map((question, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <QuestionListItem Index={index}
                                Question={question}
                                OnQuestionDeleted={this.onComponentUpdated} />
                        </li>;
                    })}
                </ol>}
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Questions: "الأسئلة",
        QuestionsSubtitle: "إذا كنت تواجه أي مشاكل ، فقم بنشر سؤال. سيقوم فريق Naqel بالرد عليهم في أقرب وقت ممكن.",
        AskQuestion: "طرح سؤال",
        YourQuestions: "أسئلتك",
        SearchQuestions: "أسئلة البحث"
    };
}
else {
    Dictionary = {
        Questions: "Questions",
        QuestionsSubtitle: "If you are facing any issues, then post a question. Naqel team will answer them as soon as possible.",
        AskQuestion: "Ask a Question",
        YourQuestions: "Your Questions",
        SearchQuestions: "Search Questions"
    };
}

export default QuestionsList;