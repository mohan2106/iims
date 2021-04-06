import React, { Component, useState } from "react";
import classes from "./AskQuery.module.css";

function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className={classes.error_msg}>
                <p>{props.message}</p>
            </div>
        );
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
            });
        }
    }

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
                                {/* <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    className={classes.form_field}
                                    value={this.state.category}
                                    onChange={(e) =>
                                        this.updateCategory(e.target.value)
                                    }
                                    placeholder="Query Category"
                                /> */}
                            </div>
                            {/* Query */}
                            <div className={classes.form_group}>
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
                                <textarea
                                    type="text"
                                    id="query"
                                    name="query"
                                    className={classes.form_text_field}
                                    value={this.state.query}
                                    onChange={(e) =>
                                        this.updateQuery(e.target.value)
                                    }
                                    rows="5"
                                    column="10"
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
            </div>
        );
    }
}
export default AskQuery;
