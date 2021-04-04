import React from 'react';
import classes from './Single.module.css';



function Single(props) {
  return (
    <>
      <div className={classes.single}>
        <img className={classes.single_img} src={props.img} alt='icon'></img>
        <h3 className={classes.single_title}>{props.title}</h3>
        <p className={classes.single_desc}>{props.desc}</p>
      </div>
    </>
  );
}

export default Single;
