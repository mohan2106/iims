import React,{useState} from 'react';
import classes from './AskQuery.module.css';

function ValidationMessage(props) {
    if (!props.valid) {
      return(
        <div className={classes.error_msg}>
            <p>{props.message}</p>
        </div>
      )
    }
    return null;
  }

const BookTrial = (props) => {
    const kidlogo = process.env.PUBLIC_URL + '/images/query.svg';
    const [name,setname] = useState('');
    const [nameValid,setNameValid] = useState(false);
    const [email,setemail] = useState('');
    const [emailValid,setEmailValid] = useState(false);
    const [standard,setstandard] = useState('');
    const [standardValid,setStandardValid] = useState(false);
    const [phone,setphone] = useState('');
    const [phoneValid,setPhoneValid] = useState(false);
    const [formValid,setFormValid] = useState(false);
    const [errorMessage,setErrorMessage] = useState({});

    const validateForm = ()=>{
        setFormValid(nameValid && emailValid && standardValid && phoneValid);
    }
    const updateName = (data) => {
        let errorMsg = {...errorMessage};
        setname(data);
        if(data.length > 0){
            setNameValid(true);
        }else{
            setNameValid(false);
            errorMsg.name = 'Name is required!';
            setErrorMessage(errorMsg);
        }
        validateForm();
    }

    const updateEmail = (data) => {
        let errorMsg = {...errorMessage};
        setemail(data);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setEmailValid(false);
            errorMsg.email = 'Invalid email format';
            setErrorMessage(errorMsg);
        }else{
            setEmailValid(true);
        }
        validateForm();
    }

    const updateStandard = (data) => {
        let errorMsg = {...errorMessage};
        setstandard(data);
        if(data.length > 0){
            setStandardValid(true);
        }else{
            setStandardValid(false);
            errorMsg.standard = 'Class is required!';
            setErrorMessage(errorMsg);
        }
        validateForm();
    }

    const updatePhone = (data) => {
        let errorMsg = {...errorMessage};
        setphone(data);
        if(data.length === 10){
            setPhoneValid(true);
        }else{
            setPhoneValid(false);
            errorMsg.phone = '10 digit phone number is required';
            setErrorMessage(errorMsg);
        }
        validateForm();
    }

    return (
        <div className={classes.main}>
            <div className={classes.container} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/CurveBackground.svg'})`}}>
                <div className={classes.item1}>
                    <h2>Ask Query</h2>
                    <p>Do you have any question regarding any Events or anything to ask from the Event Manager?</p>
                    <img src={kidlogo} alt='creative'></img>
                </div>
                <div className={classes.item2}>
                    <form action='#' id='js-form' className={classes.form}>
                        <div className={classes.form_group}>
                            <label className={classes.label} htmlFor='username'>Query</label>
                            < ValidationMessage valid={nameValid} message={errorMessage.name} />
                            <textarea type='text' id='username' name='username' className={classes.form_field}
                            value={name} onChange={(e) => updateName(e.target.value)} rows="5" column="10" placeholder='Enter your query here'/>
                        </div>
                        {/* <div className={classes.form_group}>
                            <label className={classes.label} htmlFor='email'>Email</label>
                            < ValidationMessage valid={emailValid} message={errorMessage.email} />
                            <input type='email' id='email' name='email' className={classes.form_field}
                            value={email} onChange={(e) => updateEmail(e.target.value)} placeholder='Enter email'/>
                        </div>
                        <div className={classes.phoneclass}>
                            <div className={classes.form_group1}>
                                <label className={classes.label} htmlFor='phone'>Phone</label>
                                < ValidationMessage valid={phoneValid} message={errorMessage.phone} />
                                <input type='phone' id='phone' name='phone' className={classes.form_field} 
                                value={phone} onChange={(e) => updatePhone(e.target.value)} placeholder='Enter Phone Number'/>
                            </div>
                            <div className={classes.form_group2}>
                                <label className={classes.label} htmlFor='standard'>Class</label>
                                < ValidationMessage valid={standardValid} message={errorMessage.standard}/>
                                <input type='text' id='standard' name='standard' className={classes.form_field}
                                value={standard} onChange={(e) => updateStandard(e.target.value)} placeholder='class'/>
                            </div>
                        </div> */}
                        <div className='form-controls'>
                            <button className={classes.btn} type='submit' disabled={!formValid}>Ask Query</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default BookTrial;
