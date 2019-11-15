import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FrontPage from './Containers/FrontPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={FrontPage} />
    </Switch>
  </Router>
)

export default App;
