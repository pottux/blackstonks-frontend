import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FrontPage from './Containers/FrontPage';
import DetailsPage from './Containers/DetailsPage'
import SavingsPage from './Containers/SavingsPage';
import { getExpenses, postRating } from './services/requests'

const App = () => (
  <>

    <Router>
  {/*     <ul>
        <li><Link to=''>index</Link></li>
        <li><Link to='/subscriptions'>subscriptions</Link></li>
        <li><Link to='/subscriptions2'>subscriptions2</Link></li>
      </ul> */}
   {/*    <div>
        <button onClick={getExpenses}> asds</button>
      </div>
      <div>
        <button onClick={postRating}>xddasds</button>
      </div> */}
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/subscriptions" component={SavingsPage} />
        <Route exact path="/details" component={DetailsPage} />
      </Switch>
    </Router>
  </>
)

export default App;
