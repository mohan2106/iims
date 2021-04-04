import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import classes from "./Colleges.module.css";

const list = [
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
    { name: "IIT Bombay", img: process.env.PUBLIC_URL + "/images/iitb.svg" },
    { name: "IIT Guwahati", img: process.env.PUBLIC_URL + "/images/iitg.svg" },
];

// One item component
// selected prop will be passed
const MenuItem = ({ img, text, selected }) => {
    return (
        <div
            className={`${classes.menu_item} ${selected ? classes.active : ""}`}
        >
            <img src={img} alt="college logo" />
            <p>{text}</p>
        </div>
    );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map((el) => {
        //const {na} = el;

        return (
            <MenuItem
                img={el.img}
                text={el.name}
                key={el.name}
                selected={selected}
            />
        );
    });

const Arrow = ({ text, className }) => {
    return (
        <div className={className}>
            <p>{text}</p>
        </div>
    );
};

const ArrowLeft = Arrow({ text: "<", className: classes.arrow });
const ArrowRight = Arrow({ text: ">", className: classes.arrow });

const selected = "item1";

class Colleges extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list, selected);
    }

    state = {
        selected,
    };

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className={classes.container}>
                <h2>Participating Colleges</h2>
                <ScrollMenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}

export default Colleges;
