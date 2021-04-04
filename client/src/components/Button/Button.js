import React from 'react';
import './Button.css';

const STYLES = ['btn--primary','btn--outline','btn--rounded','btn--rounded-dark'];   

const SIZES = ['btn--medium', 'btn--large','btn--mobile','btn--wide'];
const COLOR = ['primary','blue','red','green'];
export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonColor
}) => {
    // const checkButtonColor = COLOR.includes(buttonColor)? buttonColor : null;
    // const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : null;
    // const checkButtonStyle = STYLES.includes(buttonStyle)? buttonStyle : STYLES[0];
    return (
    <button className={`btn ${buttonStyle} ${buttonSize} ${buttonColor}`} onClick={onClick} type={type}>{children}</button>
    )
}