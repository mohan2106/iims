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

const Login = (props) => {
    const [email,setemail] = useState('');
    const [emailValid,setEmailValid] = useState(false);
    const [password,setpassword] = useState('');
    const [passwordValid,setPasswordValid] = useState(false);
    const [formValid,setFormValid] = useState(false);
    const [errorMessage,setErrorMessage] = useState({});

    const validateForm = ()=>{
        setFormValid(emailValid && passwordValid);
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
        }
        setErrorMessage(errorMsg);
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <h2>Sign In</h2>
                <h4>Welcome Back. SignIn and resume.</h4>
            </div>
            <form action='#' id='js-form' className={classes.form}>
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor='email'>Email</label>
                    < ValidationMessage valid={emailValid} message={errorMessage.email} />
                    <input type='email' id='email' name='email' className={classes.form_field}
                    value={email} onChange={(e) => updateEmail(e.target.value)} placeholder='Enter email'/>
                </div>
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor='password'>Password</label>
                    < ValidationMessage valid={passwordValid} message={errorMessage.password} />
                    <input type='password' id='password' name='password' className={classes.form_field}
                    value={password} onChange={(e) => updatePassword(e.target.value)} placeholder='Password'/>
                </div>
                <div className='form-controls'>
                    <button className={classes.btn} type='submit' disabled={!formValid}>Sign IN</button>
                </div>
            </form>
                
        </div>
    );
}

export default Login;