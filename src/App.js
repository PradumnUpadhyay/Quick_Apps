import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import { NavBar } from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDisplay from './components/home/Card';
import Display from './components/view/dataDisplay';

function App() {
  return (
    <Router>
      <NavBar/>
      <CardDisplay />
      <Switch>
        <Route exact path='/'> 
          <Redirect to='home' />
        </Route>
      <Route path='/home' exact component={Home}/>
      <Route path='/view' exact component={Display}/>
      </Switch>
    </Router>
  );
}

export default App;
