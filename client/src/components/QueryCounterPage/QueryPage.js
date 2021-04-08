import React, { Component } from "react";
import classes from "./QueryPage.module.css";
import { Button } from "../Button/Button";
import Single from "./Single/Single";
import SuccessError from "../SuccessError/SuccessError";

const faq = [
    {
        query: "Where is Dance competetion hosted?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        query:
            "My friend is not from IIT, Can he participate in cricket match?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        query: "Can I get snacks in the event?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        query: "Where to visit in case of medical emergency?",
        answer:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?",
    },
    {
        query:
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
                "Events",
                "Accomodation",
                "Food",
                "Safety Precautions",
                "COVID Arrangements",
                "Miscellaneous",
            ],
            category: "Miscellaneous",
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
            queries: faq,
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
                    category: this.state.categories[
                        this.state.categories.length - 1
                    ],
                    categoryValid: true,
                    query: "",
                    queryValid: false,
                    formValid: false,
                    submitted: false,
                    showPastQuery: false,
                    btnText: "Show Past Query",
                    showPopup: true,
                    successErrorPopup: true,
                    successErrorMessage: "Query Posted Successfully",
                    errorMessage: {
                        username: "",
                        category: "",
                        query: "",
                        form: "",
                    },
                    queries: faq,
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

            const url = process.env.REACT_APP_API_ENDPOINT + "query";
            fetch(url, {
                method: "GET",
            }).then(async (res) => {
                console.log(res);
                await this.setState({
                    queries: await res.json(),
                });
                console.log(this.state.queries);
            });
        } else {
            await this.setState({
                btnText: "Show Past Query",
                showPastQuery: !this.state.showPastQuery,
            });
        }
    }

    render() {
        return (
            <div className={classes.main}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Ask Query</h1>
                    <p className={classes.subtitle}>
                        Do you have any querytion regarding any Events or
                        anything to ask from the Event Manager?
                    </p>
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
                                    message={this.state.errorMessage.username}
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
                                    message={this.state.errorMessage.category}
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
                                className={classes.form_field}
                                value={this.state.query}
                                onChange={(e) =>
                                    this.updateQuery(e.target.value)
                                }
                                rows="5"
                                placeholder="Enter your query here"
                            />
                        </div>
                        {/* Submit */}
                        <div className={classes.btn}>
                            <Button
                                buttonStyle="btn--rounded-dark"
                                className={classes.btn}
                                type="submit"
                                disabled={!this.state.formValid}
                            >
                                Ask Query
                            </Button>
                        </div>
                    </form>
                </div>

                <div className={classes.past_query}>
                    <Button
                        buttonStyle="btn--rounded-dark"
                        className={classes.see_past_query_btn}
                        onClick={() => this.updateBtn()}
                    >
                        {this.state.btnText}
                    </Button>
                    {this.state.showPastQuery ? (
                        <div className={classes.faqcontainer}>
                            <div className={classes.container_fluid}>
                                {this.state.queries.map((ele) => {
                                    return <Single {...ele} />;
                                })}
                            </div>
                        </div>
                    ) : null}
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
