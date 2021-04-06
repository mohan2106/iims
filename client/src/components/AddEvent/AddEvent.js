import React,{Component} from 'react';
import classes from './AddEvent.module.css';
import DateTimePicker from 'react-datetime-picker';
import { Multiselect } from 'multiselect-react-dropdown';



class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kidlogo: process.env.PUBLIC_URL + "/images/query.svg",
            username: "",
            usernameValid: false,
            venue : "",
            venueValid:false,
            dateTime: new Date(),
            desc : "",
            descValid : false,
            collegeOptions: [
                {name: 'IIT Guwahati', id: 1},
                {name: 'IIT Bombay', id: 2},
                {name: 'IIT Delhi', id:3},
                {name: 'IIT Madras', id:4},
                {name: 'IIT Kanpur', id:5},
                {name: 'IIT Kharagpur', id:6},
                {name: 'IIT Roorkee', id:7},
                {name: 'IIT Indore', id:8},
                {name: 'IIT Hydrabad', id:9},
                {name: 'IIT Patna', id:10},
                {name: 'IIT Mandi', id:11},
            ],
            selectedValue:[],
            formValid: false,
            submitted: false,
            errorMessage: {
                username: "",
                category: "",
                query: "",
                form: "",
                venue: "",
                date: "",
                desc : ""
            },
        };
    }
    async validateForm() {
        if (
            this.state.usernameValid === true &&
            this.state.venueValid && this.state.descValid && this.state.selectedValue.length > 0
        ) {
            await this.setState({
                formValid: true,
            });
        } else {
            let errMsg = { ...this.state.errorMessage };
            errMsg.form = "Form is invalid";
            await this.setState({
                formValid: false,
                errorMessage: errMsg,
            });
        }
    }
    async updateUsername(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                username: data,
                usernameValid: true,
            });
        } else {
            errorMsg.username = "Name is required!";
            await this.setState({
                username: data,
                usernameValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }
    async updateVenue(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                venue: data,
                venueValid: true,
            });
        } else {
            errorMsg.venue = "Venue is required!";
            await this.setState({
                venue: data,
                venueValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    getCategoryOptions() {
        let options = [];
        this.state.categories.forEach((category) => {
            options.push(<option value={category}>{category}</option>);
        });
        return options;
    }

    async updateCategory(data) {
        let errorMsg = { ...this.state.errorMessage };
        console.log(data);
        if (data.length > 0 && this.state.categories.includes(data) === true) {
            await this.setState({
                category: data,
                categoryValid: true,
            });
        } else {
            errorMsg.category = "Category is required!";
            await this.setState({
                category: data,
                categoryValid: false,
                errorMessage: errorMsg,
            });
        }
        await this.validateForm();
    }

    async updateDesc(data) {
        let errorMsg = { ...this.state.errorMessage };
        if (data.length > 0) {
            await this.setState({
                desc: data,
                descValid: true,
            });
        } else {
            errorMsg.desc = "Desc is required!";
            await this.setState({
                desc: data,
                descValid: false,
                errorMessage: errorMsg,
            });
        }
        this.validateForm();
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.validateForm();
        if (this.state.formValid === true && this.state.submitted === false) {
            this.setState({
                submitted: true,
            });

            const url = process.env.REACT_APP_API_ENDPOINT + "query/";

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username,
                    venue : this.state.venue,
                    dateTime: this.state.dateTime,
                    desc: this.state.desc,
                    participatingCollege : this.state.selectedValue
                }),
            }).then(async () => {
                await this.setState({
                    username: "",
                    usernameValid: false,
                    venue : "",
                    venueValid:false,
                    desc : "",
                    descValid : false,
                    formValid: false,
                    submitted: false,
                    selectedValue = [],
                    errorMessage: {
                        username: "",
                        category: "",
                        query: "",
                        form: "",
                    },
                });
            });
        } else {
            let errMsg = { ...this.state.errorMessage };
            errMsg.form = "Form is invalid";
            await this.setState({
                errorMessage: errMsg,
            });
        }
    }
    async onSelect(selectedList, selectedItem){
        await this.setState({selectedValue:selectedList});
        console.log(this.state.selectedValue);
        this.validateForm();
    }
    async onRemove(selectedList, removedItem){
        await this.setState({selectedValue:selectedList});
        console.log(this.state.selectedValue);
        this.validateForm();
    }
    render(){
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>Add Events</h1>
                <form
                            action="#"
                            id="js-form"
                            className={classes.form}
                            onSubmit={this.handleSubmit.bind(this)}
                        >
                            <ValidationMessage
                                valid={this.state.formValid}
                                message={this.state.errorMessage.form}
                            />
                            {/* name */}
                            <div className={classes.form_group}>
                                <label
                                    className={classes.label}
                                    htmlFor="Name"
                                >
                                    Name Of Event
                                </label>
                                <ValidationMessage
                                    valid={this.state.usernameValid}
                                    message={this.state.errorMessage.username}
                                />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={classes.form_field}
                                    value={this.state.username}
                                    onChange={(e) =>
                                        this.updateUsername(e.target.value)
                                    }
                                    placeholder="Input the Event Name"
                                />
                            </div>
                            <div className={classes.form_group}>
                                <label
                                    className={classes.label}
                                    htmlFor="Venue"
                                >
                                    Venue Of Event
                                </label>
                                <ValidationMessage
                                    valid={this.state.venueValid}
                                    message={this.state.errorMessage.venue}
                                />
                                <input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    className={classes.form_field}
                                    value={this.state.value}
                                    onChange={(e) =>
                                        this.updateVenue(e.target.value)
                                    }
                                    placeholder="Input the Venue of Event"
                                />
                            </div>
                            <div className={classes.form_group}>
                                <label
                                    className={classes.label}
                                    htmlFor="Date and Time"
                                >
                                    Date and Time
                                </label>
                                <ValidationMessage
                                    valid={this.state.dateTimeValid}
                                    message={this.state.errorMessage.date}
                                />
                                <DateTimePicker
                                    onChange={(e)=>this.setState({dateTime:e})} 
                                    value={this.state.dateTime}
                                />
                            </div>
                            {/* Description */}
                            <div className={classes.form_group}>
                                <label
                                    className={classes.label}
                                    htmlFor="Venue"
                                >
                                    Event Description
                                </label>
                                <ValidationMessage
                                    valid={this.state.descValid}
                                    message={this.state.errorMessage.desc}
                                />
                                <input
                                    type="text"
                                    id="desc"
                                    name="desc"
                                    className={classes.form_field}
                                    value={this.state.desc}
                                    onChange={(e) =>
                                        this.updateDesc(e.target.value)
                                    }
                                    placeholder="Input the Venue of Event"
                                />
                            </div>
                            {/* Participating College */}
                            <div className={classes.form_group}>
                                <label
                                    className={classes.label}
                                    htmlFor="Venue"
                                >
                                    Select Participating College
                                </label>
                                <Multiselect
                                options={this.state.collegeOptions} // Options to display in the dropdown
                                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                onSelect={(a,b) => this.onSelect(a,b)} // Function will trigger on select event
                                onRemove={(a,b) => this.onRemove(a,b)} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            
                            {/* Submit */}
                            <div className="form-controls">
                                <button
                                    className={classes.btn}
                                    type="submit"
                                    disabled={!this.state.formValid}
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
            </div>
        );
    };

    
}

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



export default AddEvent