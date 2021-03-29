import React from 'react';
import classes from './TextImageComponent.module.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import {Link as Link1} from 'react-scroll';


function TextImageComponent({
  light,
  topLine,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart
}) {
  return (
    <>
      <div
        className={light ? 'home__hero_section' : 'home__her_section darkBg'}
      >
        <div className={classes.container}>
          <div
            className={`${classes.row} ${classes.home__hero_row}`}
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className={classes.col}>
              <div className={classes.home__hero_text_wrapper}>
                <div className={classes.top_line}>{topLine}</div>
                <h1 className={light ? `${classes.heading} ${classes.dark}` : classes.heading}>
                  {headline}
                </h1>
                <p
                  className={
                    light
                      ? `${classes.home__hero_subtitle} ${classes.black}`
                      : classes.home__hero_subtitle
                  }
                >
                  {description}
                </p>
                <Link to='/scoreboard'>
                  <Button buttonStyle='btn--rounded-dark' >
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className={classes.col}>
              <div className={classes.home__hero_img_wrapper}>
                <img src={img} alt={alt} className={classes.home__hero_img} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextImageComponent;
