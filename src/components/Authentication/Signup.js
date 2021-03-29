import React,{useState} from 'react';
import classes from './Login.module.css';

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

const SignUp = (props) => {
    const [name,setname] = useState('');
    const [nameValid,setNameValid] = useState(false);
    const [email,setemail] = useState('');
    const [emailValid,setEmailValid] = useState(false);
    const [standard,setstandard] = useState('');
    const [standardValid,setStandardValid] = useState(false);
    const [phone,setphone] = useState('');
    const [phoneValid,setPhoneValid] = useState(false);
    const [password,setpassword] = useState('');
    const [passwordValid,setPasswordValid] = useState(false);
    const [cnfpassword,setcnfpassword] = useState('');
    const [cnfpasswordValid,setCnfPasswordValid] = useState(false);
    const [formValid,setFormValid] = useState(false);
    const [errorMessage,setErrorMessage] = useState({});

    const validateForm = ()=>{
        setFormValid(nameValid && emailValid && standardValid && phoneValid && passwordValid && cnfpasswordValid);
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

    const updatePassword = (data) => {
        let errorMsg = {...errorMessage};
        setpassword(data);
        if(data.length === 0){
            setPasswordValid(false);
            errorMsg.password = 'Password is required';
        }else if (data.length < 6){
            setPasswordValid(false);
            errorMsg.password = 'Password needs to be 6 characters or more';
        }else{
            setPasswordValid(true);
            if(cnfpassword === password){
                setCnfPasswordValid(true);
            }
        }
        setErrorMessage(errorMsg);
    }
    const updateCnfPassword = (data) => {
        let errorMsg = {...errorMessage};
        setcnfpassword(data);
        if(data.length === 0){
            setCnfPasswordValid(false);
            errorMsg.cnfpassword = 'Confirm Password is required';
        }else if (data !== password) {
            setCnfPasswordValid(false)
            errorMsg.cnfpassword = 'Password Mismatch';
        }else{
            setCnfPasswordValid(true);
        }
        setErrorMessage(errorMsg);
    }
    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <h2>Sign Up</h2>
                <h4>Get started with us today! Create your account by filling out the information below.</h4>
            </div>
            <form action='#' id='js-form' className={classes.form}>
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor='username'>Student Name</label>
                    < ValidationMessage valid={nameValid} message={errorMessage.name} />
                    <input type='text' id='username' name='username' className={classes.form_field}
                    value={name} onChange={(e) => updateName(e.target.value)} placeholder='Enter student name'/>
                </div>
                <div className={classes.form_group}>
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
                </div>
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor='password'>Password</label>
                    < ValidationMessage valid={passwordValid} message={errorMessage.password} />
                    <input type='password' id='password' name='password' className={classes.form_field}
                    value={password} onChange={(e) => updatePassword(e.target.value)} placeholder='Password'/>
                </div>
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor='password'>Confirm Password</label>
                    < ValidationMessage valid={cnfpasswordValid} message={errorMessage.cnfpassword}/>
                    <input type='password' id='confirm_password' name='cnfpassword' className={classes.form_field}
                    value={cnfpassword} onChange={(e) => updateCnfPassword(e.target.value)} placeholder='Confirm Password'/>
                </div>
                <div className='form-controls'>
                    <button className={classes.btn} type='submit' disabled={!formValid}>Book Trial Class</button>
                </div>
            </form>
                
        </div>
    );
}

export default SignUp;