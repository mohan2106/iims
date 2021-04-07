import React from 'react';
import classes from './Scoreboard.module.css';
import {Link} from 'react-router-dom';

const Single = (props) => {
    return (
        <div className={classes.single}>
            <div className={classes.single_item}>
                {props.college}
            </div>
            <div className={classes.single_item}>
                {props.score}
            </div>
            <div className={classes.single_item}>
                {props.rank}
            </div>
        </div>
    );
}
const Scoreboard = () => {
    var data = {
        eventname:'Football',
        scores : [
            {
                college:'IIT Guwahati',
                score:1254,
            },
            {
                college:'IIT Bombay',
                score:1100,
            },
            {
                college:'IIT Indore',
                score:1002,
            },
            {
                college:'IIT Madras',
                score:999,
            },

            {
                college:'IIT Bombay',
                score:1212,
            }
        ]
    }
    const sortedData = data.scores.sort((a,b) => {return b.score - a.score});
    const listData = sortedData.map((d,i)=>{
        const pass = {
            ...d,
            rank:(i+1)
        };
        return (
            <Single {...pass}/>
        );
    })
    return (
        <div className={classes.container}>
            <div className={classes.eventname}>{data.eventname}</div>
            <div className={classes.list}>
                <div className={classes.single}>
                    <div className={`${classes.single_item} ${classes.dark}`}>
                        College Name
                    </div>
                    <div className={`${classes.single_item} ${classes.dark}`}>
                        Scores
                    </div>
                    <div className={`${classes.single_item} ${classes.dark}`}>
                        Rank
                    </div>
                </div>
                {listData}
            </div>
            <Link to='/updateScore/id'>
                <button className={classes.update}>Update ScoreBoard</button>
            </Link>
        </div>
    );
}

export default Scoreboard;