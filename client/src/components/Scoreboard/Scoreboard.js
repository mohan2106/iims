import React, { useState, useEffect } from "react";
import classes from "./Scoreboard.module.css";

const Scoreboard = (props) => {
    const [updateScoreboard, setUpdateScoreboard] = useState(false);
    const [btnText, setBtnText] = useState("Update Scoreboard");
    const [collegeScore, setCollegeScore] = useState([]);
    const [sortedScoreboard, setSortedScoreboard] = useState([]);

    const showForm = () => {
        const data = sortedScoreboard
            .sort((a, b) => {
                return b.score - a.score;
            })
            .map((d) => {
                var dd = { ...d };
                dd.isUpdating = true;
                return dd;
            });
        setSortedScoreboard(data);
    };

    const showList = () => {
        let prevRank = 0;
        let prevScore = Infinity;
        console.log(sortedScoreboard);
        const data = sortedScoreboard
            .sort((a, b) => {
                return b.score - a.score;
            })
            .map((d) => {
                var dd = { ...d };
                dd.isUpdating = false;
                if (dd.score < prevScore) {
                    prevScore = dd.score;
                    dd.rank = prevRank + 1;
                    prevRank = dd.rank;
                } else {
                    dd.rank = prevRank;
                }
                return dd;
            });
        setSortedScoreboard(data);
    };

    const changeScoreboard = async () => {
        console.log(collegeScore);
        console.log(sortedScoreboard);
        if (!updateScoreboard) {
            showForm();
            setBtnText("Save Scoreboard");
        } else {
            const url =
                process.env.REACT_APP_API_ENDPOINT +
                "event/" +
                props.eventid +
                "/scoreboard";
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    scores: sortedScoreboard.map((college) => {
                        return {
                            college: college.college,
                            score: parseInt(college.score),
                        };
                    }),
                }),
            })
                .then(async (res) => {
                    console.log(res);
                })
                .catch(async (err) => {
                    console.log(err);
                });
            showList();
            setBtnText("Update Scoreboard");
        }
        setUpdateScoreboard(!updateScoreboard);
    };

    const updateScore = (score, id) => {
        var update = collegeScore.map((d) => {
            var dd = d;
            if (id === d.id) {
                dd.score = score;
            }
            return dd;
        });
        setCollegeScore(update);
        var update2 = sortedScoreboard.map((d, i) => {
            var dd = d;
            if (id === d.id) {
                dd.score = score;
            }
            return dd;
        });
        setSortedScoreboard(update2);
    };
    useEffect(() => {
        let url = process.env.REACT_APP_API_ENDPOINT + "event/";
        if (props.hasOwnProperty("eventid")) {
            url = url.concat(props.eventid);
            url = url.concat("/scoreboard");
        } else {
            url = url.concat("scoreboard");
        }
        console.log(url);
        fetch(url).then(async (res) => {
            const scores = await res.json();
            console.log(scores);
            setCollegeScore(scores);
            let prevRank = 0;
            let prevScore = Infinity;
            const sortedData = scores
                .sort((a, b) => {
                    return b.score - a.score;
                })
                .map((d, i) => {
                    const pass = {
                        ...d,
                        id: i,
                        isUpdating: false,
                    };
                    if (pass.score < prevScore) {
                        prevScore = pass.score;
                        pass.rank = prevRank + 1;
                        prevRank = pass.rank;
                    } else {
                        pass.rank = prevRank;
                    }
                    return pass;
                });
            setSortedScoreboard(sortedData);
        });
    }, [props]);
    return (
        <div className={classes.container}>
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
                {sortedScoreboard.map((props, i) => {
                    return (
                        <div className={classes.single}>
                            <div className={classes.single_item}>
                                {props.college}
                            </div>
                            {updateScoreboard ? (
                                <div>
                                    <input
                                        type="number"
                                        value={props.score}
                                        onChange={(e) =>
                                            updateScore(
                                                e.target.value,
                                                props.id
                                            )
                                        }
                                    ></input>
                                </div>
                            ) : (
                                <div className={classes.single_item}>
                                    {props.score}
                                </div>
                            )}

                            <div className={classes.single_item}>
                                {props.rank}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <Link to='/updateScore/id'> */}
            {props.eventid && (
                <button onClick={changeScoreboard} className={classes.update}>
                    {btnText}
                </button>
            )}
            {/* </Link> */}
        </div>
    );
};

export default Scoreboard;
