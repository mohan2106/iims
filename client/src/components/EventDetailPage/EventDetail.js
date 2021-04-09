import React, { useState, useEffect, Component } from "react";
import classes from "./EventDetail.module.css";
import { GoLocation } from "react-icons/go";
import Scoreboard from "../Scoreboard/Scoreboard";
import moment from "moment";

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

class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            formValid: false,
            submitted: false,
            errorMessage: {
                form: "",
            },
        };
    }

    async updateQuery(data) {
        if (data.length > 0) {
            await this.setState({
                query: data,
                formValid: true,
            });
        } else {
            let errMsg = { ...this.state.errorMessage };
            errMsg.form = "Report Message is required";
            await this.setState({
                query: data,
                formValid: false,
                errorMessage: errMsg,
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        // await this.validateForm();
        if (this.state.formValid === true && this.state.submitted === false) {
            this.setState({
                submitted: true,
            });

            const url = process.env.REACT_APP_API_ENDPOINT + "report/";

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    report: this.state.query,
                }),
            }).then(async () => {
                await this.setState({
                    query: "",
                    formValid: false,
                    submitted: false,
                    errorMessage: {
                        form: "",
                    },
                });
            });
            this.props.showSuccessMessage(true);
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
                {/* Query */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="query">
                        What to Report?
                    </label>
                    <textarea
                        type="text"
                        id="query"
                        name="query"
                        className={classes.form_text_field}
                        value={this.state.query}
                        onChange={(e) => this.updateQuery(e.target.value)}
                        rows="5"
                        placeholder="Enter your report message here"
                    />
                </div>
                {/* Submit */}
                <div className="form-controls">
                    <button
                        className={classes.btn}
                        type="submit"
                        disabled={!this.state.formValid}
                    >
                        Report
                    </button>
                </div>
            </form>
        );
    }
}

const EventDetail = (props) => {
    // fetch event details of event id = id
    const [viewScoreBoard, setView] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successImage, setSuccessImage] = useState(
        process.env.PUBLIC_URL + "/images/sport.svg"
    );

    const togglePopup = (data) => {
        setShowPopup(data);
        setShowSuccess(false);
    };
    const updateView = () => {
        setView(!viewScoreBoard);
    };
    const [state, setState] = useState({
        eventName: "",
        desc: "",
        venue: "",
        dateTime: "",
        participatingCollege: [],
    });

    const showSuccessMessage = (isSuccess) => {
        setShowSuccess(true);
        if (isSuccess) {
            setSuccessImage(process.env.PUBLIC_URL + "/images/success.png");
        } else {
            setSuccessImage(process.env.PUBLIC_URL + "/images/cross.png");
        }
    };

    useEffect(() => {
        const url =
            process.env.REACT_APP_API_ENDPOINT +
            "event/" +
            props.match.params.id;
        fetch(url)
            .then(async (res) => {
                const eventDetails = await res.json();
                eventDetails.dateTime = moment(eventDetails.dateTime).format(
                    "llll"
                );
                // const d = eventDetails.dateTime;
                // // const d2 = new Date();
                // // console.log(d.getDate());
                // console.log(typeof d);
                // const e = new Date(d);
                // console.log(e);
                // console.log(typeof e);
                eventDetails["scoreboard url"] = "/scoreboard/";
                eventDetails["scoreboard url"] = eventDetails[
                    "scoreboard url"
                ].concat(props.match.params.id);

                const collegedata = eventDetails.participatingCollege.map(
                    (d) => {
                        return (
                            <div className={classes.single_college}>{d}</div>
                        );
                    }
                );
                eventDetails.participatingCollege = collegedata;
                setState(eventDetails);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

    return (
        <div className={classes.container}>
            <div className={classes.title}>{state.name}</div>
            <div className={classes.desc}>{state.desc}</div>
            <div className={classes.venue}>
                <GoLocation />
                {state.venue}
            </div>
            <div className={classes.time_and_date}>{state.dateTime}</div>
            <div className={classes.participating_college}>
                {state.participatingCollege}
            </div>
            <div className={classes.btns}>
                {/* <Link to='/scoreboard/eventid'> */}
                <button
                    onClick={updateView}
                    className={classes.view_scoreboard}
                >
                    View ScoreBoard
                </button>
                {/* </Link> */}
                <button
                    className={classes.report}
                    onClick={() => togglePopup(true)}
                >
                    Report Event
                </button>
                {showPopup ? (
                    <div className={classes.popup}>
                        <div className={classes.popup_inner}>
                            {/* <h1>{this.props.text}</h1> */}
                            {showSuccess ? (
                                <div className={classes.succes_image}>
                                    <img src={successImage} alt="" />
                                </div>
                            ) : (
                                <Report
                                    showSuccessMessage={showSuccessMessage}
                                />
                            )}
                            <button
                                className={classes.close}
                                onClick={() => togglePopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
            {viewScoreBoard ? (
                <Scoreboard eventid={props.match.params.id} />
            ) : null}
        </div>
    );
};

export default EventDetail;
