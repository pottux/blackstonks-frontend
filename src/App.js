import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BlackstonksContext from './BlackstonksContext'
import { getExpenses } from './services/requests'
import FrontPage from './Containers/FrontPage';
import DetailsPage from './Containers/DetailsPage'
import ReoccurringExpensesPage from './Containers/ReoccurringExpensesPage';

const App = () => {

  const [recurringPayments, setRecurringPayments] = useState(null)

  const doFetchExpenses = async () => {
    const result = await getExpenses()
    setRecurringPayments(result.data)
  }
  
  useEffect(()=> {
    doFetchExpenses()
  }, [])

  return (
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
      <BlackstonksContext.Provider value={{ recurringPayments }}>
        <Switch>
          <Route exact path="/" component={ReoccurringExpensesPage} />
          <Route path="/details/:id" render={({ match }) => <DetailsPage id={match.params.id} />} />
        </Switch>
        </BlackstonksContext.Provider>
      </Router>
    </>
  )

}

export default App;
