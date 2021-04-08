import React, { Component } from "react";
import classes from "./SuccessError.module.css";

class SuccessError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shows: props.show,
            successImage: process.env.PUBLIC_URL + "/images/success.png",
            errorImage: process.env.PUBLIC_URL + "/images/cross.png",
        };

        console.log(props);
    }

    render() {
        return (
            <div>
                {this.state.shows && (
                    <div className={classes.popup}>
                        <div className={classes.popup_inner}>
                            <header>
                                <div
                                    onClick={this.props.closePopup}
                                    className={`${classes["close-button"]} ${classes["topright"]}`}
                                >
                                    &times;
                                </div>
                            </header>
                            <div className={classes.popup_content}>
                                <div className={classes.success_image}>
                                    {this.props.success ? (
                                        <img
                                            src={this.state.successImage}
                                            alt="Success"
                                        />
                                    ) : (
                                        <img
                                            src={this.state.errorImage}
                                            alt="Error"
                                        />
                                    )}
                                </div>
                                <div className={classes.message}>
                                    {this.props.message}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SuccessError;
