import React, { Component } from "react";
import classes from "./AskQuery.module.css";
import Single from "../QueryCounterPage/Single/Single";
import SuccessError from "../SuccessError/SuccessError";

const faqs = [
    {
        ques: "Where is Dance competetion hosted?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        ques: "My friend is not from IIT, Can he participate in cricket match?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        ques: "Can I get snacks in the event?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        ques: "Where to visit in case of medical emergency?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        ques:
            "I have registered for the event and will not be able to play due to some reason, what to do?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
];

function ValidationMessage(props) {
    if (!props.valid) {
        return <p className={classes.error_msg}>{props.message}</p>;
    }
    return null;
}

class AskQuery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kidlogo: process.env.PUBLIC_URL + "/images/query.svg",
            username: "",
            usernameValid: false,
            categories: [
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
                "Category 5",
                "Category 6",
            ],
            category: "Category 1",
            categoryValid: true,
            query: "",
            queryValid: false,
            formValid: false,
            submitted: false,
            showPastQuery: false,
            btnText: "Show Past Query",
            showPopup: false,
            successErrorPopup: false,
            successErrorMessage: "",
            errorMessage: {
                username: "",
                category: "",
                query: "",
                form: "",
            },
        };
    }

    async validateForm() {
        if (
            this.state.usernameValid === true &&
            this.state.categoryValid === true &&
            this.state.queryValid === true
        ) {
            await this.setState({
                formValid: true,
            });
        } else {
            let errMsg = { ...this.state.errorMessage };
            errMsg.form = "Form is invalid";
            await this.setState({
                formValid: false,
                errorMessage: errMsg,
            });
        }
    }
    async updateUsername(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                username: data,
                usernameValid: true,
            });
        } else {
            errorMsg.username = "Name is required!";
            await this.setState({
                username: data,
                usernameValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    getCategoryOptions() {
        let options = [];
        this.state.categories.forEach((category) => {
            options.push(<option value={category}>{category}</option>);
        });
        return options;
    }

    async updateCategory(data) {
        let errorMsg = { ...this.state.errorMessage };
        console.log(data);
        if (data.length > 0 && this.state.categories.includes(data) === true) {
            await this.setState({
                category: data,
                categoryValid: true,
            });
        } else {
            errorMsg.category = "Category is required!";
            await this.setState({
                category: data,
                categoryValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    async updateQuery(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                query: data,
                queryValid: true,
            });
        } else {
            errorMsg.query = "Query is required!";
            await this.setState({
                query: data,
                queryValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.validateForm();
        const popupDelay = 15 * 1000;
        if (this.state.formValid === true && this.state.submitted === false) {
            this.setState({
                submitted: true,
            });

            const url = process.env.REACT_APP_API_ENDPOINT + "query/";

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username,
                    category: this.state.category,
                    query: this.state.query,
                }),
            }).then(async () => {
                await this.setState({
                    username: "",
                    usernameValid: false,
                    category: "",
                    categoryValid: true,
                    query: "",
                    queryValid: false,
                    formValid: false,
                    submitted: false,
                    showPopup: true,
                    successErrorPopup: true,
                    successErrorMessage: "Query Posted Successfully",
                    errorMessage: {
                        username: "",
                        category: "",
                        query: "",
                        form: "",
                    },
                });
            });
        } else {
            let errMsg = { ...this.state.errorMessage };
            errMsg.form = "Form is invalid";
            await this.setState({
                errorMessage: errMsg,
                showPopup: true,
                successErrorPopup: false,
                successErrorMessage: "Query could not be posted",
            });
        }
    }

    async updateBtn() {
        if (!this.state.showPastQuery) {
            await this.setState({
                btnText: "Close Past Query",
                showPastQuery: !this.state.showPastQuery,
            });
        } else {
            await this.setState({
                btnText: "Show Past Query",
                showPastQuery: !this.state.showPastQuery,
            });
        }
    }

    data = () => {
        return faqs.map((ele) => {
            return <Single {...ele} />;
        });
    };

    render() {
        return (
            <div className={classes.main}>
                <div
                    className={classes.container}
                    style={{
                        backgroundImage: `url(${
                            process.env.PUBLIC_URL +
                            "/images/CurveBackground.svg"
                        })`,
                    }}
                >
                    <div className={classes.item1}>
                        <h2>Ask Query</h2>
                        <p>
                            Do you have any question regarding any Events or
                            anything to ask from the Event Manager?
                        </p>
                        <img src={this.state.kidlogo} alt="creative"></img>
                    </div>
                    <div className={classes.item2}>
                        <form
                            action="#"
                            id="js-form"
                            className={classes.form}
                            onSubmit={this.handleSubmit.bind(this)}
                        >
                            <ValidationMessage
                                valid={this.state.formValid}
                                message={this.state.errorMessage.form}
                            />
                            {/* Username */}
                            <div className={classes.form_group}>
                                <div className={classes.container_label}>
                                    <label
                                        className={classes.label}
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <ValidationMessage
                                        valid={this.state.usernameValid}
                                        message={
                                            this.state.errorMessage.username
                                        }
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={classes.form_field}
                                    value={this.state.username}
                                    onChange={(e) =>
                                        this.updateUsername(e.target.value)
                                    }
                                    placeholder="Username"
                                />
                            </div>
                            {/* Category */}
                            <div className={classes.form_group}>
                                <div className={classes.container_label}>
                                    <label
                                        className={classes.label}
                                        htmlFor="category"
                                    >
                                        Query Category
                                    </label>
                                    <ValidationMessage
                                        valid={this.state.categoryValid}
                                        message={
                                            this.state.errorMessage.category
                                        }
                                    />
                                </div>
                                <select
                                    name="category"
                                    id="category"
                                    className={classes.form_field}
                                    value={this.state.category}
                                    onChange={(e) =>
                                        this.updateCategory(e.target.value)
                                    }
                                >
                                    {this.getCategoryOptions()}
                                </select>
                            </div>
                            {/* Query */}
                            <div className={classes.form_group}>
                                <div className={classes.container_label}>
                                    <label
                                        className={classes.label}
                                        htmlFor="query"
                                    >
                                        Query
                                    </label>
                                    <ValidationMessage
                                        valid={this.state.queryValid}
                                        message={this.state.errorMessage.query}
                                    />
                                </div>
                                <textarea
                                    type="text"
                                    id="query"
                                    name="query"
                                    className={classes.form_text_field}
                                    value={this.state.query}
                                    onChange={(e) =>
                                        this.updateQuery(e.target.value)
                                    }
                                    column="5"
                                    placeholder="Enter your query here"
                                />
                            </div>
                            {/* Submit */}
                            <div className="form-controls">
                                <button
                                    className={classes.btn}
                                    type="submit"
                                    disabled={!this.state.formValid}
                                >
                                    Ask Query
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.showPopup && (
                    <div>
                        <SuccessError
                            show={true}
                            success={this.state.successErrorPopup}
                            message={this.state.successErrorMessage}
                            closePopup={async () => {
                                await this.setState({
                                    showPopup: false,
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default AskQuery;
