import React from 'react';
import classes from './EventsPage.module.css';
import {Link} from 'react-router-dom';


const Single = (props) => {
    return (
        <div className={classes.single}>
            <img src={props.img} alt="event-logo" className={classes.item1}/>
            <div className={classes.item2}>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
    );
}


const EventsPage = (props)=>{
    const eventlist = [
        {
            img:process.env.PUBLIC_URL + '/images/atheletcs.svg',
            title:'Atheletics',
            desc:'Inter IIT Atheletic game'
        },
        {
            img: process.env.PUBLIC_URL + '/images/football.svg',
            title:'Football',
            desc:'Inter IIT Football tournament'
        },
        {
            img: process.env.PUBLIC_URL + '/images/movies.svg',
            title:'Entertainment',
            desc:'Inter IIT Fun and Entertainment Event'
        },
        {
            img: process.env.PUBLIC_URL + '/images/techmeet.svg',
            title:'Tech Meet',
            desc:'Inter IIT Tech Meet'
        },
    ];
    const list = eventlist.map(data => {
        return (
            <Link to="/eventDetails/id">
                <Single img={data.img} title={data.title} desc={data.desc}></Single>
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
           
            <div className={classes.eventlist}>
                {list}
            </div>
        </div>
    );
}

export default EventsPage;