import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FrontPage from './Containers/FrontPage';
import SubscriptionsPage from './Containers/SubscriptionsPage';
import SavingsPage from './Containers/SavingsPage';

const App = () => (
  <>

    <Router>
      <ul>
        <li><Link to=''>index</Link></li>
        <li><Link to='/subscriptions'>subscriptions</Link></li>
        <li><Link to='/subscriptions2'>subscriptions2</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/subscriptions" component={SubscriptionsPage} />
        <Route exact path="/subscriptions2" component={SavingsPage} />
      </Switch>
    </Router>
  </>
)

export default App;
