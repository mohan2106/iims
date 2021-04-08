import React, { Component } from "react";
import classes from "./AddEvent.module.css";
import DateTimePicker from "react-datetime-picker";
import { Multiselect } from "multiselect-react-dropdown";
import { Button } from "../Button/Button";
import SuccessError from "../SuccessError/SuccessError";

class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            nameValid: false,
            venue: "",
            venueValid: false,
            dateTime: new Date(),
            dateTimeValid: true,
            shortDesc: "",
            shortDescValid: false,
            desc: "",
            descValid: false,
            showPopup: false,
            successErrorPopup: false,
            successErrorMessage: "",
            collegeOptions: [
                { name: "IIT Guwahati", id: 1 },
                { name: "IIT Bombay", id: 2 },
                { name: "IIT Delhi", id: 3 },
                { name: "IIT Madras", id: 4 },
                { name: "IIT Kanpur", id: 5 },
                { name: "IIT Kharagpur", id: 6 },
                { name: "IIT Roorkee", id: 7 },
                { name: "IIT Indore", id: 8 },
                { name: "IIT Hydrabad", id: 9 },
                { name: "IIT Patna", id: 10 },
                { name: "IIT Mandi", id: 11 },
            ],
            selectedValue: [],
            formValid: false,
            submitted: false,
            errorMessage: {
                name: "",
                shortDesc: "",
                form: "",
                venue: "",
                date: "",
                desc: "",
                dateTime: "",
            },
        };
    }
    async validateForm() {
        if (
            this.state.nameValid &&
            this.state.shortDescValid &&
            this.state.dateTimeValid &&
            this.state.venueValid &&
            this.state.descValid &&
            this.state.selectedValue.length > 1
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
    async updateName(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                name: data,
                nameValid: true,
            });
        } else {
            errorMsg.name = "Name is required!";
            await this.setState({
                name: data,
                nameValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    async updateShortDesc(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                shortDesc: data,
                shortDescValid: true,
            });
        } else {
            errorMsg.shortDesc = "Short Desc is required!";
            await this.setState({
                shortDesc: data,
                shortDescValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    async updateDateTime(data) {
        console.log(data);
        let errorMsg = { ...this.state.errorMessage };
        if (data === undefined || data === null) {
            errorMsg.dateTime = "Date and Time are required!";
            await this.setState({
                dateTime: data,
                dateTimeValid: false,
                errorMessage: errorMsg,
            });
        } else if (data - new Date() < 0) {
            errorMsg.dateTime = "Date and Time are in the past!";
            await this.setState({
                dateTime: data,
                dateTimeValid: false,
                errorMessage: errorMsg,
            });
        } else {
            await this.setState({
                dateTime: data,
                dateTimeValid: true,
            });
        }
        this.validateForm();
    }

    async updateVenue(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                venue: data,
                venueValid: true,
            });
        } else {
            errorMsg.venue = "Venue is required!";
            await this.setState({
                venue: data,
                venueValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    async updateDesc(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                desc: data,
                descValid: true,
            });
        } else {
            errorMsg.desc = "Desc is required!";
            await this.setState({
                desc: data,
                descValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.validateForm();
        const popupDelay = 1 * 1000;
        if (this.state.formValid === true && this.state.submitted === false) {
            let colleges = [];
            console.log(this.state);
            this.state.selectedValue.forEach((college) => {
                colleges.push(college.name);
            });
            this.setState({
                submitted: true,
            });

            const url = process.env.REACT_APP_API_ENDPOINT + "event/";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: this.state.name,
                    shortDesc: this.state.shortDesc,
                    venue: this.state.venue,
                    dateTime: this.state.dateTime,
                    desc: this.state.desc,
                    participatingCollege: colleges,
                }),
            }).then(async () => {
                await this.setState({
                    name: "",
                    nameValid: false,
                    shortDesc: "",
                    shortDescValid: false,
                    venue: "",
                    venueValid: false,
                    dateTime: new Date(),
                    dateTimeValid: true,
                    desc: "",
                    descValid: false,
                    formValid: false,
                    submitted: false,
                    showPopup: true,
                    successErrorPopup: true,
                    successErrorMessage: "Event Created Successfully",
                    selectedValue: [],
                    errorMessage: {
                        name: "",
                        shortDesc: "",
                        category: "",
                        query: "",
                        form: "",
                        dateTime: "",
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
                successErrorMessage: "Event could not be created",
            });
        }
    }
    async onSelect(selectedList, selectedItem) {
        await this.setState({ selectedValue: selectedList });
        console.log(this.state.selectedValue);
        this.validateForm();
    }
    async onRemove(selectedList, removedItem) {
        await this.setState({ selectedValue: selectedList });
        console.log(this.state.selectedValue);
        this.validateForm();
    }
    render() {
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>Add Events</h1>
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
                    {/* name */}
                    <div className={classes.form_group}>
                        <div className={classes.container_label}>
                            <label className={classes.label} htmlFor="Name">
                                Name Of Event
                            </label>
                            <ValidationMessage
                                valid={this.state.nameValid}
                                message={this.state.errorMessage.name}
                            />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={classes.form_field}
                            value={this.state.name}
                            onChange={(e) => this.updateName(e.target.value)}
                            placeholder="Input the Event Name"
                        />
                    </div>
                    {/* Short Description */}
                    <div className={classes.form_group}>
                        <div className={classes.container_label}>
                            <label
                                className={classes.label}
                                htmlFor="shortDesc"
                            >
                                Short Description
                            </label>
                            <ValidationMessage
                                valid={this.state.shortDescValid}
                                message={this.state.errorMessage.shortDesc}
                            />
                        </div>
                        <input
                            type="text"
                            id="shortDesc"
                            name="shortDesc"
                            className={classes.form_field}
                            value={this.state.shortDesc}
                            onChange={(e) =>
                                this.updateShortDesc(e.target.value)
                            }
                            placeholder="Input the Short Description of Event"
                        />
                    </div>
                    {/* venue */}
                    <div className={classes.form_group}>
                        <div className={classes.container_label}>
                            <label className={classes.label} htmlFor="venue">
                                Venue Of Event
                            </label>
                            <ValidationMessage
                                valid={this.state.venueValid}
                                message={this.state.errorMessage.venue}
                            />
                        </div>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            className={classes.form_field}
                            value={this.state.value}
                            onChange={(e) => this.updateVenue(e.target.value)}
                            placeholder="Input the Venue of Event"
                        />
                    </div>
                    {/* Date and Time */}
                    <div className={classes.form_group}>
                        <div className={classes.container_label}>
                            <label
                                className={classes.label}
                                htmlFor="Date and Time"
                            >
                                Date and Time
                            </label>
                            <ValidationMessage
                                valid={this.state.dateTimeValid}
                                message={this.state.errorMessage.dateTime}
                            />
                        </div>
                        <DateTimePicker
                            onChange={(e) => this.updateDateTime(e)}
                            value={this.state.dateTime}
                        />
                    </div>
                    {/* Description */}
                    <div className={classes.form_group}>
                        <div className={classes.container_label}>
                            <label className={classes.label} htmlFor="desc">
                                Event Description
                            </label>
                            <ValidationMessage
                                valid={this.state.descValid}
                                message={this.state.errorMessage.desc}
                            />
                        </div>
                        <textarea
                            type="text"
                            id="desc"
                            name="desc"
                            className={classes.form_field}
                            value={this.state.desc}
                            onChange={(e) => this.updateDesc(e.target.value)}
                            placeholder="Input the Description of Event"
                            rows="5"
                        />
                    </div>
                    {/* Participating College */}
                    <div className={classes.form_group}>
                        <label className={classes.label} htmlFor="Venue">
                            Select Participating College
                        </label>
                        <Multiselect
                            options={this.state.collegeOptions} // Options to display in the dropdown
                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={(a, b) => this.onSelect(a, b)} // Function will trigger on select event
                            onRemove={(a, b) => this.onRemove(a, b)} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>
                    {/* Submit */}
                    <div className={classes.btn}>
                        <Button
                            buttonStyle="btn--rounded-dark"
                            type="submit"
                            disabled={!this.state.formValid}
                        >
                            Add Event
                        </Button>
                    </div>
                </form>
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

function ValidationMessage(props) {
    if (!props.valid) {
        return <p className={classes.error_msg}>{props.message}</p>;
    }
    return null;
}

export default AddEvent;
