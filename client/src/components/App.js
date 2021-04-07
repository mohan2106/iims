import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Authentication/LoginPage";
import Home from "./HomePage/Home";
import Footer from "./Footer/Footer";
import Event from "./EventsPage/EventsPage";
import { Component } from "react";
import AddEvent from './AddEvent/AddEvent';
import QueryCounter from './QueryCounterPage/QueryPage';
import EventDetail from './EventDetailPage/EventDetail';

class App extends Component {

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/iims" exact component={Home} />
                    <Route path="/signin" exact component={Login} />
                    <Route path="/events" exact component={Event} />
                    <Route path="/scoreboard" exact component={ScoreBoard} />
                    <Route path="/query" exact component={QueryCounter} />
                    <Route path="/addEvent" exact component={AddEvent} />
                    <Route path="/eventDetails/:id" exact component={EventDetail} />
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
