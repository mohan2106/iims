import React from 'react';
import classes from './EventDetail.module.css';
import {GoLocation} from 'react-icons/go';
import {Link} from 'react-router-dom';

const EventDetail = () => {
    // fetch event details of event id = id
    const props = {
        eventName:'Football Match',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis deleniti at neque vero, adipisci autem ullam id dicta. Natus nisi omnis, deleniti iste eum fugit exercitationem expedita architecto, minima repellat nobis voluptatibus culpa earum eos, quos alias est! Voluptas praesentium non quos facere eos fugiat neque, dolores provident velit dolor!',
        venue:'Football Ground, IIT Guwahati, Guwahati, Assam',
        timeDate: '15th April, 2021',
        participatingCollege : [
            'IIT Guwhati',
            'IIT Bombay',
            'IIT Indore',
            'IIT Kanpur',
            'IIT Kharagpur'
        ],
    };
    return (
        <div className={classes.container}>
            <div className={classes.title}>{props.eventName}</div>
            <div className={classes.desc}>{props.desc}</div>
            <div className={classes.venue}><GoLocation/>{props.venue}</div>
            <div className={classes.time_and_date}>{props.timeDate}</div>
            <div className={classes.participating_college}></div>
            <div className={classes.btns}>
                <Link to='/scoreboard/eventid'>
                    <button className={classes.view_scoreboard}>View ScoreBoard</button>
                </Link>
                <button className={classes.report}>Report Event</button>
            </div>
        </div>
    );
}

export default EventDetail