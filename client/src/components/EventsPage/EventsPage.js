import React, { useState, useEffect } from "react";
import classes from "./EventsPage.module.css";
import { Link } from "react-router-dom";

const Single = (props) => {
    return (
        <div className={classes.single}>
            <img src={props.img} alt="event-logo" className={classes.item1} />
            <div className={classes.item2}>
                <h2>{props.name}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
    );
};

const EventsPage = (props) => {
    const [eventlist, setEventlist] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_ENDPOINT + "event";
        fetch(url)
            .then(async (res) => {
                const eventlist = await res.json();
                eventlist.forEach((event) => {
                    event.img =
                        process.env.PUBLIC_URL + "/images/atheletcs.svg";
                    event.url = "/eventDetails/" + event.id;
                });
                setEventlist(eventlist);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const list = eventlist.map((data) => {
        return (
            <Link to={data.url}>
                <Single
                    img={data.img}
                    name={data.name}
                    desc={data.desc}
                ></Single>
            </Link>
        );
    });
    return (
        <div className={classes.container}>
            <h1>Events</h1>
            <div className={classes.add_event}>
                <Link to="/addEvent">
                    <button className={classes.add_event_btn}>Add Event</button>
                </Link>
            </div>

            <div className={classes.eventlist}>{list}</div>
        </div>
    );
};

export default EventsPage;
