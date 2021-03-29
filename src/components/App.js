import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './Authentication/LoginPage';
import Home from './HomePage/Home';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/iims' exact component={Home} />
        <Route path='/signin' exact component={Login} />
        <Route path='/events' exact component={Event} />
        <Route path='/scoreboard' exact component={ScoreBoard} />
      </Switch>
      <Footer/>
    </Router>
   
  );
}
const Event = () => {
  return <h1>Event Page</h1>
}
const ScoreBoard = () => {
  return <h1>Score Board Page</h1>
}


export default App;
