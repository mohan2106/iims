import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Authentication/LoginPage";
import Home from "./HomePage/Home";
import Footer from "./Footer/Footer";
import Event from "./EventsPage/EventsPage";
import { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:5000/testAPI")
            .then((res) => res.text())
            .then((res) => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <Router>
                {/* <p>{this.state.apiResponse}</p> */}
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/iims" exact component={Home} />
                    <Route path="/signin" exact component={Login} />
                    <Route path="/events" exact component={Event} />
                    <Route path="/scoreboard" exact component={ScoreBoard} />
                </Switch>
                <Footer />
            </Router>
        );
    }
}

const ScoreBoard = () => {
    return <h1>Score Board Page</h1>;
};

export default App;
