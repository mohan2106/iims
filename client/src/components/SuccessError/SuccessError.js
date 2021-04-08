import React,{useState,useEffect} from 'react';
import classes from './SuccessError.module.css';

const SuccessError = (props) => {
    const [show,setShow] = useState(false);
    const [success,setSuccess] = useState(false);
    useEffect(()=>{

    })
    return (
        <div>
            {props.show ? 
                <div className={classes.popup}>
                    <div className={classes.popup_inner}>
                        
                        <button className={classes.close} onClick={() => togglePopup(false)}>Don't Report</button>
                    </div>
                </div> : 
            null}
        </div>
        
    );
}

export default SuccessError