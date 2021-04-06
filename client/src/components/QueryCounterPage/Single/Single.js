import React,{useState,useRef} from 'react';
import classes from './Single.module.css';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

const Single = (props)=>{
    const [isOpen,change] = useState(false);
    const [setHeight, setHeightState] = useState("0px");
    const content = useRef(null);
    const toggle = ()=> {
        setHeightState(
            isOpen ? "0px" : `${content.current.scrollHeight}px`
          );
          change(!isOpen);
    };
    return (
        <IconContext.Provider value={{color:'black'}}>
            <div>
            <div className={classes.accordion} onClick={toggle}>
                <h5>{props.ques}</h5>
                { isOpen ? <FaChevronUp className={classes.icon}/> 
                : <FaChevronDown className={classes.icon}/>
                }
                
            </div>
            <div
                ref={content}
                style={{ maxHeight: `${setHeight}` }}
                className={classes.accordion__content}
            >
                <div 
                    className={classes.panel}
                    dangerouslySetInnerHTML={{ __html: props.answer }}
                />
            </div>
        </div>
        </IconContext.Provider>
        
    );
}

export default Single;