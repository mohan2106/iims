import React,{useState} from 'react';
import classes from './LoginPage.module.css';
import Login from './Login';
import Signup from './Signup';

const LoginPage = (props) => {
    const [islogin,setIsLogin] = useState(true);
    const [switchText,setSwitchText] = useState(`Don't have account? Register Now`);
    const switchComponent = ()=>{
        setIsLogin(!islogin);
        if(islogin){
            setSwitchText(`Don't have account? Register Now`);
        }else{
            setSwitchText(`Already have account? Login Now`);
        }
    }
    return (
        <div className={classes.container}>
            {islogin ? <Login/> : <Signup/>}
            <p className={classes.switch_text} onClick={switchComponent}>{switchText}</p>
        </div>
    )
}

export default LoginPage;