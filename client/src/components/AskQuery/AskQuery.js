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
            category: "",
            categoryValid: false,
            query: "",
            queryValid: false,
            formValid: false,
            errorMessage: {
                username: "",
                category: "",
                query: "",
                form: "",
            },
        };
    }

    validateForm() {
        if (
            this.state.usernameValid === true &&
            this.state.categoryValid === true &&
            this.state.queryValid === true
        ) {
            this.setState({
                formValid: true,
            });
        } else {
            var errMsg = { ...this.state.errorMessage };
            this.setState({
                formValid: false,
                errorMessage: errMsg,
            });
        }
    }
    updateUsername(data) {
        var errorMsg = { ...this.state.errorMessage };
        this.setState({
            username: data,
        });
        if (data.length > 0) {
            this.setState({
                usernameValid: true,
            });
        } else {
            errorMsg.username = "Name is required!";
            this.setState({
                usernameValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    updateCategory(data) {
        var errorMsg = { ...this.state.errorMessage };
        this.setState({
            category: data,
        });
        if (data.length > 0) {
            this.setState({
                categoryValid: true,
            });
        } else {
            errorMsg.category = "Category is required!";
            this.setState({
                categoryValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    updateQuery(data) {
        var errorMsg = { ...this.state.errorMessage };
        this.setState({
            query: data,
        });
        if (data.length > 0) {
            this.setState({
                queryValid: true,
            });
        } else {
            errorMsg.query = "Query is required!";
            this.setState({
                queryValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log(this);
        this.validateForm();
        if (this.state.formValid === true) {
            const url = "http://localhost:5000/testAPI";

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
            }).then((result) => {
                // alert(JSON.stringify(result));
                this.setState({
                    username: "",
                    usernameValid: false,
                    category: "",
                    categoryValid: false,
                    query: "",
                    queryValid: false,
                    formValid: false,
                    errorMessage: {
                        username: "",
                        category: "",
                        query: "",
                        form: "",
                    },
                });
            });
        } else {
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
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    className={classes.form_field}
                                    value={this.state.category}
                                    onChange={(e) =>
                                        this.updateCategory(e.target.value)
                                    }
                                    placeholder="Query Category"
                                />
                            </div>
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
