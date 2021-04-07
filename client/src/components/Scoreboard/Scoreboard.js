import React,{useState,useEffect} from 'react';
import classes from './Scoreboard.module.css';
import {Link} from 'react-router-dom';

const Single = (props) => {
    return (
        <div className={classes.single}>
            <div className={classes.single_item}>
                {props.college}
            </div>
            {props.isUpdating ? 
            <div>
                <input type="number" value={props.score}
                onChange={(e) =>
                    props.updateScore(e.target.value,props.id)
                }></input>
            </div> : 
            <div className={classes.single_item}>
                {props.score}
            </div>
            }
            
            <div className={classes.single_item}>
                {props.rank}
            </div>
        </div>
    );
}
const Scoreboard = () => {
    const [updateScoreboard,setUpdateScoreboard] = useState(false);
    const [btnText,setBtnText] = useState('Update Scoreboard');
    const [collegeScore,setCollegeScore] = useState([]);
    const [sortedScoreboard,setSortedScoreboard] = useState([]);
    // const [collegeScoreData,setCollegeScoreData] = useState([]);

    const showForm = ()=>{
        const data = sortedScoreboard.sort((a,b) => {return b.score - a.score}).map((d) => {
            var dd = {...d};
            dd.isUpdating = true;
            return dd;
        });
        setSortedScoreboard(data);
    }

    const showList = ()=>{
        const data = sortedScoreboard.sort((a,b) => {return b.score - a.score}).map((d,i) => {
            var dd = {...d};
            dd.isUpdating = false;
            dd.rank = i+1;
            return dd;
        });
        setSortedScoreboard(data);
    }
    
    const changeScoreboard = () => {
        console.log(collegeScore);
        console.log(sortedScoreboard);
        if(!updateScoreboard){
            showForm();
            setBtnText('Save Scoreboard');
        }else{
            showList();
            setBtnText('Update Scoreboard');
        }
        setUpdateScoreboard(!updateScoreboard);
    }
    
    const updateScore = (score,id) => {
        console.log("Update Function is called\n",score);
        console.log(collegeScore);
        console.log(sortedScoreboard);
        var update = collegeScore.map((d)=>{
            var dd = d;
            if(id === d.id){
                dd.score = score;
            }
            return dd;
        });
        setCollegeScore(update);
        var update2 = sortedScoreboard.map((d,i)=>{
            var dd = d;
            if(id === d.id){
                dd.score = score;
            }
            return dd;
        });
        // console.log(sortedScoreboard);
        console.log(update2);
        setSortedScoreboard(update2);
    }
    useEffect(() => {
        var scores = [
                {
                    id : '1',
                    college:'IIT Guwahati',
                    score:1254,
                },
                {
                    id : '2',
                    college:'IIT Bombay',
                    score:1100,
                },
                {
                    id : '3',
                    college:'IIT Indore',
                    score:1002,
                },
                {
                    id : '4',
                    college:'IIT Madras',
                    score:999,
                },
    
                {
                    id : '5',
                    college:'IIT Bombay',
                    score:1212,
                }
            ];
        setCollegeScore(scores);
        const sortedData = scores.sort((a,b) => {return b.score - a.score}).map((d,i)=>{
            const pass = {
                ...d,
                rank:(i+1),
                isUpdating : updateScoreboard,
            };
            return pass;
        });
        setSortedScoreboard(sortedData);
    },[]);
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
                {sortedScoreboard.map((props) => {
                    return (
                        <div className={classes.single}>
                            <div className={classes.single_item}>
                                {props.college}
                            </div>
                            {updateScoreboard ? 
                            <div>
                                <input type="number" value={props.score}
                                onChange={(e) =>
                                    updateScore(e.target.value,props.id)
                                }></input>
                            </div> : 
                            <div className={classes.single_item}>
                                {props.score}
                            </div>
                            }
                            
                            <div className={classes.single_item}>
                                {props.rank}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <Link to='/updateScore/id'> */}
                <button onClick={changeScoreboard} className={classes.update}>{btnText}</button>
            {/* </Link> */}
        </div>
    );
}

export default Scoreboard;