import React, { useEffect, useState } from "react";
import classes from "./EventDetail.module.css";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

const EventDetail = (props) => {
    // fetch event details of event id = id
    const [state, setState] = useState({
        eventName: "Football Match",
        desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis deleniti at neque vero, adipisci autem ullam id dicta. Natus nisi omnis, deleniti iste eum fugit exercitationem expedita architecto, minima repellat nobis voluptatibus culpa earum eos, quos alias est! Voluptas praesentium non quos facere eos fugiat neque, dolores provident velit dolor!",
        venue: "Football Ground, IIT Guwahati, Guwahati, Assam",
        dateTime: "15th April, 2021",
        participatingCollege: [
            "IIT Guwhati",
            "IIT Bombay",
            "IIT Indore",
            "IIT Kanpur",
            "IIT Kharagpur",
        ],
    });

    useEffect(() => {
        const url =
            process.env.REACT_APP_API_ENDPOINT +
            "event/" +
            props.match.params.id;
        fetch(url)
            .then(async (res) => {
                const eventDetails = await res.json();
                console.log(eventDetails);
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
                <Link to="/scoreboard/eventid">
                    <button className={classes.view_scoreboard}>
                        View ScoreBoard
                    </button>
                </Link>
                <button className={classes.report}>Report Event</button>
            </div>
        </div>
    );
};

export default EventDetail;
