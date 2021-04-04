import React, { useState } from "react";
import classes from "./Login.module.css";
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className={classes.error_msg}>
                <p>{props.message}</p>
            </div>
        );
    }
    return null;
}

const SignUp = (props) => {
    const [name, setname] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [email, setemail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [college, setcollege] = useState("");
    const [collegeValid, setCollegeValid] = useState(false);
    const [rollno, setrollno] = useState("");
    const [rollnoValid, setRollnoValid] = useState(false);
    const [password, setpassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [cnfpassword, setcnfpassword] = useState("");
    const [cnfpasswordValid, setCnfPasswordValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorMsg = { ...errorMessage };
        validateForm();
        if (formValid) {
            try {
                setLoading(true);
            } catch {
                setFormValid(false);
                errorMsg.name = "Faild to create an account";
                setErrorMessage(errorMsg);
            }
            setLoading(false);
        } else {
            setFormValid(false);
            errorMsg.name = "Form is invalid";
            setErrorMessage(errorMsg);
        }
    };

    const validateForm = () => {
        updateName(name);
        updateEmail(email);
        updateCollege(college);
        updateRollno(rollno);
        updatePassword(password);
        updateCnfPassword(cnfpassword);
        if (
            nameValid &&
            emailValid &&
            collegeValid &&
            rollnoValid &&
            passwordValid &&
            cnfpasswordValid
        ) {
            console.log("x");
            setFormValid(true);
            console.log(
                "Form = ",
                formValid,
                nameValid &&
                    emailValid &&
                    collegeValid &&
                    rollnoValid &&
                    passwordValid &&
                    cnfpasswordValid
            );
        } else {
            console.log("y");
            setFormValid(false);
        }
    };
    const updateName = (data) => {
        let errorMsg = { ...errorMessage };
        setname(data);
        if (data.length > 0) {
            setNameValid(true);
        } else {
            setNameValid(false);
            errorMsg.name = "Name is required!";
            setErrorMessage(errorMsg);
        }
        console.log("Name = ", nameValid);
    };

    const updateEmail = (data) => {
        let errorMsg = { ...errorMessage };
        setemail(data);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailValid(false);
            errorMsg.email = "Invalid email format";
            setErrorMessage(errorMsg);
        } else {
            setEmailValid(true);
        }
        console.log("Email = ", emailValid);
    };

    const updateCollege = (data) => {
        let errorMsg = { ...errorMessage };
        setcollege(data);
        if (data.length > 0) {
            setCollegeValid(true);
        } else {
            setCollegeValid(false);
            errorMsg.name = "College Name is required!";
            setErrorMessage(errorMsg);
        }
        console.log("College = ", collegeValid);
    };

    const updateRollno = (data) => {
        let errorMsg = { ...errorMessage };
        setrollno(data);
        if (data.length > 0) {
            setRollnoValid(true);
        } else {
            setRollnoValid(false);
            errorMsg.phone = "Roll No is required";
            setErrorMessage(errorMsg);
        }
        console.log("Rollno = ", rollnoValid);
    };

    const updatePassword = (data) => {
        let errorMsg = { ...errorMessage };
        setpassword(data);
        if (data.length === 0) {
            setPasswordValid(false);
            errorMsg.password = "Password is required";
        } else if (data.length < 6) {
            setPasswordValid(false);
            errorMsg.password = "Password needs to be 6 characters or more";
        } else {
            setPasswordValid(true);
            if (cnfpassword === password) {
                setCnfPasswordValid(true);
            }
        }
        setErrorMessage(errorMsg);
        console.log("Password = ", passwordValid);
    };
    const updateCnfPassword = (data) => {
        let errorMsg = { ...errorMessage };
        setcnfpassword(data);
        if (data.length === 0) {
            setCnfPasswordValid(false);
            errorMsg.cnfpassword = "Confirm Password is required";
        } else if (data !== password) {
            setCnfPasswordValid(false);
            errorMsg.cnfpassword = "Password Mismatch";
        } else {
            setCnfPasswordValid(true);
        }
        setErrorMessage(errorMsg);
        console.log("Cnfpassword = ", cnfpasswordValid);
    };
    return (
        <div className={classes.container}>
            {/* Form Heading */}
            <div className={classes.heading}>
                <h2>Sign Up</h2>
                <h4>Register as a participant to participate in Inter-IIT</h4>
            </div>
            <ValidationMessage valid={formValid} message={errorMessage.name} />
            <form
                action="#"
                id="js-form"
                className={classes.form}
                onSubmit={(e) => handleSubmit(e)}
            >
                {/* Participant Name field */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="username">
                        Participant Name
                    </label>
                    <ValidationMessage
                        valid={nameValid}
                        message={errorMessage.name}
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={classes.form_field}
                        value={name}
                        onChange={(e) => updateName(e.target.value)}
                        placeholder="Enter participant name"
                    />
                </div>
                {/* Email field */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="email">
                        Email
                    </label>
                    <ValidationMessage
                        valid={emailValid}
                        message={errorMessage.email}
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={classes.form_field}
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                {/* College Name field */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="collegeName">
                        college Name
                    </label>
                    <ValidationMessage
                        valid={collegeValid}
                        message={errorMessage.college}
                    />
                    <input
                        type="text"
                        id="collegeName"
                        name="collegeName"
                        className={classes.form_field}
                        value={college}
                        onChange={(e) => updateCollege(e.target.value)}
                        placeholder="Enter college name"
                    />
                </div>
                {/* Roll No field */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="rollno">
                        Roll Number
                    </label>
                    <ValidationMessage
                        valid={rollnoValid}
                        message={errorMessage.rollno}
                    />
                    <input
                        type="number"
                        id="rollno"
                        name="rollno"
                        className={classes.form_field}
                        value={rollno}
                        onChange={(e) => updateRollno(e.target.value)}
                        placeholder="Enter Roll Number"
                    />
                </div>
                {/* Password */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="password">
                        Password
                    </label>
                    <ValidationMessage
                        valid={passwordValid}
                        message={errorMessage.password}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={classes.form_field}
                        value={password}
                        onChange={(e) => updatePassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                {/* Confirm Password */}
                <div className={classes.form_group}>
                    <label className={classes.label} htmlFor="password">
                        Confirm Password
                    </label>
                    <ValidationMessage
                        valid={cnfpasswordValid}
                        message={errorMessage.cnfpassword}
                    />
                    <input
                        type="password"
                        id="confirm_password"
                        name="cnfpassword"
                        className={classes.form_field}
                        value={cnfpassword}
                        onChange={(e) => updateCnfPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                </div>
                {/* Submit */}
                <div className="form-controls">
                    <button
                        className={classes.btn}
                        type="submit"
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
