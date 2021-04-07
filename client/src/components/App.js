import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Authentication/LoginPage";
import Home from "./HomePage/Home";
import Footer from "./Footer/Footer";
import Event from "./EventsPage/EventsPage";
import { Component } from "react";
import AddEvent from "./AddEvent/AddEvent";
import QueryCounter from "./QueryCounterPage/QueryPage";
import EventDetail from "./EventDetailPage/EventDetail";
import ScoreBoard from "./Scoreboard/Scoreboard";

class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/signin" exact component={Login} />
                    <Route path="/events" exact component={Event} />
                    <Route
                        path="/scoreboard/:eventid"
                        exact
                        component={ScoreBoard}
                    />
                    <Route path="/scoreboard" exact component={ScoreBoard} />
                    <Route path="/query" exact component={QueryCounter} />
                    <Route path="/addEvent" exact component={AddEvent} />
                    <Route
                        path="/eventDetails/:id"
                        exact
                        component={EventDetail}
                    />
                </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;
