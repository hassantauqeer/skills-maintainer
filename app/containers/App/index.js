/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CallBack from '../../components/CallBack';
import Auth from '../Authorization/Auth';
// import history from "../../containers/Authorization/history";

export default function App() {
  const auth = new Auth();

  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <CallBack {...props} />
        }}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
