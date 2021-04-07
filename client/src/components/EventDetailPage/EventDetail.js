import React, { useState, useEffect } from "react";
import classes from "./EventDetail.module.css";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import Scoreboard from "../Scoreboard/Scoreboard";

const EventDetail = (props) => {
    // fetch event details of event id = id
    const [viewScoreBoard, setView] = useState(false);
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

    useEffect(() => {
        const url =
            process.env.REACT_APP_API_ENDPOINT +
            "event/" +
            props.match.params.id;
        fetch(url)
            .then(async (res) => {
                const eventDetails = await res.json();
                eventDetails["scoreboard url"] = "/scoreboard/";
                eventDetails["scoreboard url"] = eventDetails[
                    "scoreboard url"
                ].concat(props.match.params.id);
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
                <button className={classes.report}>Report Event</button>
            </div>
            {viewScoreBoard ? (
                <Scoreboard eventid={props.match.params.id} />
            ) : null}
        </div>
    );
};

export default EventDetail;
