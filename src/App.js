import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FrontPage from './Containers/FrontPage';
import SubscriptionsPage from './Containers/SubscriptionsPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route exact path="/subscriptions" component={SubscriptionsPage} />
    </Switch>
  </Router>
)

export default App;
