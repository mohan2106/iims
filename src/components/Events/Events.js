import React from 'react';
import classes from './Events.module.css';
import Single from './Single/Single';
import {Button} from '../Button/Button';
import {Link} from 'react-router-dom';

function WhatWeDo(props) {
  console.log(classes);
    const data = props.wwd.map((ele,index) => {
        return (
          <div className={classes.child}>
          <Single {...ele}/>
        </div>
        );
    });
  return (
    <>
      <div>
        <h2 className={classes.whatwedo}>Inter IIT Events</h2>
        <div className={classes.container}>
          {data}
        </div>
        <div className={classes.btn}>
          {/* <div className={classes.childbtn}></div> */}
          <Link to='/events'>
            <Button buttonStyle='btn--rounded-dark'>All Events</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;
