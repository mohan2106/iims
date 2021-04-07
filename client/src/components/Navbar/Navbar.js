import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Button/Button.js";
import classes from "./Navbar.module.css";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    // const handleButton = ()=>setButton(!button);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener("resize", showButton);
    return (
        <>
            <IconContext.Provider value={{ color: "#6B25D0" }}>
                <div className={classes.navbar}>
                    <div
                        className={`${classes.navbar_container} ${classes.container}`}
                    >
                        <Link
                            to="/"
                            className={classes.navbar_logo}
                            onClick={closeMobileMenu}
                        >
                            {/* <MdFingerprint className='navbar-icon'/> */}
                            {/* <img src={process.env.PUBLIC_URL + '/Images/logo.svg'} className={classes.navbar_icon} alt="logo" /> */}
                            IIMS
                        </Link>
                        <div
                            className={classes.menu_icon}
                            onClick={handleClick}
                        >
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul
                            className={
                                click
                                    ? `${classes.nav_menu} ${classes.active}`
                                    : classes.nav_menu
                            }
                        >
                            <li className={classes.nav_item}>
                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className={classes.nav_links}
                                    smooth={true}
                                    duration={1000}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className={classes.nav_item}>
                                <Link
                                    to="/events"
                                    className={classes.nav_links}
                                    smooth={true}
                                    duration={1000}
                                >
                                    Events
                                </Link>
                            </li>
                            <li className={classes.nav_item}>
                                <Link
                                    to="/scoreboard"
                                    className={classes.nav_links}
                                    smooth={true}
                                    duration={1000}
                                >
                                    ScoreBoard
                                </Link>
                            </li>
                            <li className={classes.nav_item}>
                                <Link
                                    to="/query"
                                    className={classes.nav_links}
                                    smooth={true}
                                    duration={1000}
                                >
                                    Query
                                </Link>
                            </li>
                            <li className={classes.nav_btn}>
                                {button ? (
                                    <Link
                                        to="/signin"
                                        className={classes.btn_link}
                                    >
                                        <Button buttonStyle="btn--rounded">
                                            LogIn/SignUp
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/signin"
                                        className={classes.btn_link}
                                        onClick={closeMobileMenu}
                                    >
                                        <Button
                                            buttonStyle="btn--outline"
                                            buttonSize="btn--mobile"
                                        >
                                            SIGN IN
                                        </Button>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
