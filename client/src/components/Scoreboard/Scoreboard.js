import React, { useEffect, useState } from "react";
import classes from "./Scoreboard.module.css";
import { Link } from "react-router-dom";

const Single = (props) => {
    return (
        <div className={classes.single}>
            <div className={classes.single_item}>{props.college}</div>
            <div className={classes.single_item}>{props.score}</div>
            <div className={classes.single_item}>{props.rank}</div>
        </div>
    );
};
const Scoreboard = (props) => {
    const [state, setState] = useState({
        eventname: "",
        scores: [],
    });

    useEffect(() => {
        let url = process.env.REACT_APP_API_ENDPOINT + "event/";
        if (props.match.params.hasOwnProperty("eventid")) {
            url = url.concat(props.match.params.eventid);
            url = url.concat("/scoreboard");
        } else {
            url = url.concat("scoreboard");
        }
        fetch(url)
            .then(async (res) => {
                const scoreboard = await res.json();
                console.log(scoreboard);
                setState(scoreboard);
            })
            .catch((err) => {});
    }, [props.match.params]);

    const listData = state.scores.map((college) => {
        return <Single {...college} />;
    });
    return (
        <div className={classes.container}>
            <div className={classes.eventname}>{state.eventname}</div>
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
            <Link to="/updateScore/id">
                <button className={classes.update}>Update ScoreBoard</button>
            </Link>
        </div>
    );
};

export default Scoreboard;
